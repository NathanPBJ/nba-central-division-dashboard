const PACERS_TEAM_ID = '11'
const PACERS_SLUG = 'ind'
const WIKI_TITLE = 'Indiana_Pacers'
const LOCAL_COURT_IMAGES = {
  'T.J. McConnell': '/players/tj-mcconnell.jpeg',
  'Andrew Nembhard': '/players/andrew-nembhard.jpeg',
  'Ben Sheppard': '/players/ben-sheppard.jpeg',
  'Obi Toppin': '/players/obi-toppin.jpeg',
  'Tyrese Haliburton': '/players/tyrese-haliburton.jpeg',
  'Aaron Nesmith': '/players/aaron-nesmith.jpeg',
  'Jarace Walker': '/players/jarace-walker.jpeg',
  'Johnny Furphy': '/players/johnny-furphy.jpeg',
  'Kobe Brown': '/players/kobe-brown-layup.jpeg',
  'Jay Huff': '/players/jay-huff.jpeg',
  'Quenton Jackson': '/players/quenton-jackson.jpeg',
  'Ivica Zubac': '/players/ivica-zubac.jpeg',
  'Kam Jones': '/players/kam-jones.jpeg',
  'Taelon Peter': '/players/taelon-peter.jpeg',
  'Ethan Thompson': '/players/ethan-thompson.jpeg',
  'Jalen Slawson': '/players/jalen-slawson.jpeg',
  'Micah Potter': '/players/micah-potter.jpeg',
  'Myles Turner': '/players/myles-turner.jpeg',
  'Pascal Siakam': '/players/pascal-siakam.jpeg',
  'Bennedict Mathurin': '/players/bennedict-mathurin.jpeg',
  'Isaiah Jackson': '/players/isaiah-jackson.jpeg',
  'James Wiseman': '/players/james-wiseman.jpeg',
  'RayJ Dennis': '/players/rayj-dennis.jpeg',
}

const LOCAL_COURT_POSITIONS = {
  'Kobe Brown': 'object-[center_40%]', // Push the image up so his head is visible
  'Kam Jones': 'object-[center_30%]', // Push the image down so the top of his head is visible
  'Jalen Slawson': 'object-[center_20%]', // Adjust for shooting motion
  'Ben Sheppard': 'object-[center_10%]', // Layup motion
  'Obi Toppin': 'object-[center_10%]', // Dunking motion
  'Tyrese Haliburton': 'object-center',
  'Pascal Siakam': 'object-[center_10%]',
  'Myles Turner': 'object-top',
  'Bennedict Mathurin': 'object-[center_10%]',
  'Aaron Nesmith': 'object-[center_10%]',
  'Andrew Nembhard': 'object-top',
  'T.J. McConnell': 'object-[center_10%]',
  'Isaiah Jackson': 'object-top',
  'Jarace Walker': 'object-[center_10%]',
  'Johnny Furphy': 'object-[center_10%]',
}
const CACHE_TTL_MS = 1000 * 60 * 5
const STALE_TTL_MS = 1000 * 60 * 60
const REQUEST_TIMEOUT_MS = 12000
const RETRIES = 2

const requestHeaders = {
  accept: 'application/json',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
}

let liveCache = {
  expiresAt: 0,
  staleUntil: 0,
  payload: null,
}

function currentEspnSeasonYear(now = new Date()) {
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  return month >= 10 ? year + 1 : year
}

function statLookup(stats = []) {
  return Object.fromEntries(stats.map((stat) => [stat.name || stat.type, stat]))
}

function cleanWikiValue(value = '') {
  return String(value)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/'''/g, '')
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
    .replace(/<br\s*\/?>/gi, ' / ')
    .replace(/<ref[\s\S]*?<\/ref>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractInfoboxValue(wikitext, key) {
  const line = String(wikitext)
    .split('\n')
    .find((item) => {
      const text = item.trim().toLowerCase()
      return text.startsWith(`| ${key.toLowerCase()}`) || text.startsWith(`|${key.toLowerCase()}`)
    })

  if (!line) return ''

  return cleanWikiValue(line.slice(line.indexOf('=') + 1))
}


function parseNumber(value) {
  const number = Number.parseFloat(value)
  return Number.isFinite(number) ? number : null
}

function parseMadeAttempted(value) {
  const [made, attempted] = String(value || '').split('-').map(parseNumber)
  return {
    made: made || 0,
    attempted: attempted || 0,
  }
}

function safeFixed(value, digits = 1) {
  const number = Number(value)
  return Number.isFinite(number) ? Number(number.toFixed(digits)) : null
}

function displayNumber(value, digits = 1) {
  const number = Number(value)
  return Number.isFinite(number) ? number.toFixed(digits) : '-'
}

function parseAchievementNumber(value) {
  const match = String(value || '').match(/\d+/)
  return match ? match[0] : '-'
}

function parseParentheticalYears(value) {
  const match = String(value || '').match(/\(([^)]+)\)/)
  return match ? match[1].replace(/\s+/g, ' ') : ''
}

function parseAchievement(label, value, kind) {
  const total = parseAchievementNumber(value)
  const years = parseParentheticalYears(value)

  if (kind === 'league') {
    const abaMatch = String(value).match(/ABA:\s*(\d+)/i)
    const nbaMatch = String(value).match(/NBA:\s*(\d+)/i)
    return {
      label,
      value: total,
      detail: years ? `${years}` : value,
      badges: [
        { label: 'ABA', value: abaMatch?.[1] || '0' },
        { label: 'NBA', value: nbaMatch?.[1] || '0' },
      ],
    }
  }

  if (kind === 'division') {
    const abaMatch = String(value).match(/ABA:\s*(\d+)/i)
    const nbaMatch = String(value).match(/NBA:\s*(\d+)/i)
    return {
      label,
      value: total,
      detail: years || value,
      badges: [
        { label: 'ABA', value: abaMatch?.[1] || '0' },
        { label: 'NBA', value: nbaMatch?.[1] || '0' },
      ],
    }
  }

  return {
    label,
    value: total,
    detail: years || value,
    badges: [],
  }
}

function parsePlayerStats(statsPayload, seasonYear) {
  const averages = statsPayload?.categories?.find((category) => category.name === 'averages')
  if (!averages) return null

  const names = averages.names || []
  const teamSeason =
    averages.statistics?.find(
      (row) => row.teamId === PACERS_TEAM_ID && Number(row.season?.year) === seasonYear,
    ) ||
    averages.statistics?.find((row) => Number(row.season?.year) === seasonYear) ||
    averages.statistics?.at(-1)

  if (!teamSeason) return null

  const get = (name) => {
    const index = names.indexOf(name)
    return index >= 0 ? teamSeason.stats[index] : null
  }

  const gp = parseNumber(get('gamesPlayed')) || 0
  if (gp <= 0) return null

  const fg = parseMadeAttempted(get('avgFieldGoalsMade-avgFieldGoalsAttempted'))
  const three = parseMadeAttempted(get('avgThreePointFieldGoalsMade-avgThreePointFieldGoalsAttempted'))

  return {
    gp,
    min: parseNumber(get('avgMinutes')),
    fg: parseNumber(get('fieldGoalPct')),
    three: parseNumber(get('threePointFieldGoalPct')),
    fgm: fg.made,
    fga: fg.attempted,
    threeMade: three.made,
    threeAttempted: three.attempted,
    reb: parseNumber(get('avgRebounds')),
    ast: parseNumber(get('avgAssists')),
    blk: parseNumber(get('avgBlocks')),
    stl: parseNumber(get('avgSteals')),
    tov: parseNumber(get('avgTurnovers')),
    pts: parseNumber(get('avgPoints')),
  }
}

function aggregatePlayerStats(playerStats) {
  const activeLines = playerStats.filter((player) => player.hasCurrentStats)

  const sum = (key) => activeLines.reduce((total, player) => total + (Number(player[key]) || 0), 0)

  const fgm = sum('fgm')
  const fga = sum('fga')
  const threeMade = sum('threeMade')
  const threeAttempted = sum('threeAttempted')

  return {
    fgPct: fga ? safeFixed((fgm / fga) * 100) : null,
    threePct: threeAttempted ? safeFixed((threeMade / threeAttempted) * 100) : null,
    rebounds: safeFixed(sum('reb')),
    assists: safeFixed(sum('ast')),
    turnovers: safeFixed(sum('tov')),
    steals: safeFixed(sum('stl')),
    blocks: safeFixed(sum('blk')),
  }
}

function mapGames(scoreboard) {
  return (scoreboard.events || [])
    .map((event) => {
      const competition = event.competitions?.[0]
      const competitors = competition?.competitors || []
      const pacers = competitors.find((entry) => entry.team?.id === PACERS_TEAM_ID)
      const opponent = competitors.find((entry) => entry.team?.id !== PACERS_TEAM_ID)
      const completed = event.status?.type?.completed

      if (!pacers || !opponent || !completed) return null

      const pacersScore = Number(pacers.score)
      const opponentScore = Number(opponent.score)

      return {
        id: event.id,
        date: event.date,
        opponent: opponent.team?.abbreviation || opponent.team?.shortDisplayName,
        opponentName: opponent.team?.displayName,
        homeAway: pacers.homeAway,
        result: pacers.winner ? 'W' : 'L',
        score: `${pacersScore}-${opponentScore}`,
        margin: pacersScore - opponentScore,
      }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
}

function monthlyPerformance(games) {
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' })
  const buckets = new Map()

  for (const game of games) {
    const date = new Date(game.date)
    const key = `${date.getFullYear()}-${date.getMonth()}`
    const label = formatter.format(date)
    const bucket = buckets.get(key) || { month: label, wins: 0, losses: 0, net: 0, games: 0 }
    bucket.wins += game.result === 'W' ? 1 : 0
    bucket.losses += game.result === 'L' ? 1 : 0
    bucket.net += game.margin
    bucket.games += 1
    buckets.set(key, bucket)
  }

  return [...buckets.values()].map((bucket) => ({
    ...bucket,
    net: Number((bucket.net / Math.max(1, bucket.games)).toFixed(1)),
  }))
}

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function fetchJson(url, options = {}) {
  let lastError

  for (let attempt = 0; attempt <= RETRIES; attempt += 1) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch(url, {
        headers: requestHeaders,
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      lastError = error
      if (attempt < RETRIES) {
        await wait(300 * (attempt + 1))
      }
    } finally {
      clearTimeout(timeout)
    }
  }

  if (options.optional) return null
  throw new Error(`${lastError instanceof Error ? lastError.message : 'Request failed'}: ${url}`)
}

function buildTeamStats(standingStats, aggregateStats) {
  return [
    {
      metric: 'Points per game',
      value: standingStats.avgPointsFor?.displayValue || '0',
      context: 'Scoring',
      rankLabel: 'Team mark',
      rankValue: null,
    },
    {
      metric: 'Opponent PPG',
      value: standingStats.avgPointsAgainst?.displayValue || '0',
      context: 'Defense',
      rankLabel: 'Team mark',
      rankValue: null,
    },
    {
      metric: 'Point differential',
      value: standingStats.differential?.displayValue || '0',
      context: 'Margin',
      rankLabel: 'Team mark',
      rankValue: null,
    },
    {
      metric: 'Win percentage',
      value: standingStats.winPercent?.displayValue || '0',
      context: 'Record',
      rankLabel: 'Team mark',
      rankValue: null,
    },
    {
      metric: 'Playoff seed',
      value: standingStats.playoffSeed?.displayValue || '-',
      context: 'Eastern Conference',
      rankLabel: 'Conference seed',
      rankValue: parseNumber(standingStats.playoffSeed?.displayValue),
    },
    {
      metric: 'FG%',
      value: displayNumber(aggregateStats.fgPct),
      context: 'Roster-weighted estimate',
      rankLabel: 'Shooting mark',
      rankValue: null,
    },
    {
      metric: '3P%',
      value: displayNumber(aggregateStats.threePct),
      context: 'Roster-weighted estimate',
      rankLabel: 'Shooting mark',
      rankValue: null,
    },
    {
      metric: 'Rebounds',
      value: displayNumber(aggregateStats.rebounds),
      context: 'Estimated per game',
      rankLabel: 'Team mark',
      rankValue: null,
    },
    {
      metric: 'Assists',
      value: displayNumber(aggregateStats.assists),
      context: 'Estimated per game',
      rankLabel: 'Team mark',
      rankValue: null,
    },
    {
      metric: 'Turnovers',
      value: displayNumber(aggregateStats.turnovers),
      context: 'Estimated per game',
      rankLabel: 'Team mark',
      rankValue: null,
    },
  ]
}

function mapAthleteLinks(links = []) {
  return links
    .filter((link) => link.href?.startsWith('http'))
    .map((link) => ({
      label: link.shortText || link.text || 'Profile',
      href: link.href,
      type: link.rel?.find((rel) => ['playercard', 'stats', 'bio', 'news', 'gamelog', 'splits'].includes(rel)) || 'profile',
    }))
}

function mapSocialLinks(links = []) {
  return links
    .filter((link) => /instagram|twitter|x\.com|tiktok/i.test(link.href || link.text || ''))
    .map((link) => ({
      label: link.shortText || link.text || 'Social',
      href: link.href,
    }))
}

function playerCourtImage(athlete) {
  if (LOCAL_COURT_IMAGES[athlete.displayName]) return LOCAL_COURT_IMAGES[athlete.displayName]
  return athlete.headshot?.href || ''
}

function playerCourtImagePosition(athlete) {
  return LOCAL_COURT_POSITIONS[athlete.displayName] || 'object-[center_10%]'
}

async function buildPacersPayload() {
  const seasonYear = currentEspnSeasonYear()
  const startDate = `${seasonYear - 1}1001`
  const endDate = `${seasonYear}0630`

  const [team, roster, standings, scoreboard, wikiSummary, wikiParse] = await Promise.all([
    fetchJson(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${PACERS_SLUG}`),
    fetchJson(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${PACERS_SLUG}/roster`),
    fetchJson('https://site.web.api.espn.com/apis/v2/sports/basketball/nba/standings?region=us&lang=en&contentorigin=espn'),
    fetchJson(
      `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?teams=${PACERS_TEAM_ID}&dates=${startDate}-${endDate}`,
    ),
    fetchJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${WIKI_TITLE}`),
    fetchJson(
      `https://en.wikipedia.org/w/api.php?action=parse&page=${WIKI_TITLE}&prop=wikitext&format=json&formatversion=2&origin=*`,
    ),
  ])

  const athletes = roster.athletes || []
  const playerStatsPayloads = await Promise.allSettled(
    athletes.map((athlete) =>
      fetchJson(
        `https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/${athlete.id}/stats?region=us&lang=en&contentorigin=espn`,
        { optional: true },
      ),
    ),
  )

  const playerStats = athletes.map((athlete, index) => {
    const parsed =
      playerStatsPayloads[index].status === 'fulfilled'
        ? parsePlayerStats(playerStatsPayloads[index].value, seasonYear)
        : null

    return {
      id: athlete.id,
      name: athlete.displayName,
      position: athlete.position?.abbreviation || athlete.position?.displayName || '-',
      pts: parsed?.pts ?? null,
      reb: parsed?.reb ?? null,
      ast: parsed?.ast ?? null,
      stl: parsed?.stl ?? null,
      blk: parsed?.blk ?? null,
      fg: parsed?.fg ?? null,
      three: parsed?.three ?? null,
      min: parsed?.min ?? null,
      gp: parsed?.gp ?? 0,
      tov: parsed?.tov ?? null,
      fgm: parsed?.fgm ?? 0,
      fga: parsed?.fga ?? 0,
      threeMade: parsed?.threeMade ?? 0,
      threeAttempted: parsed?.threeAttempted ?? 0,
      hasCurrentStats: Boolean(parsed),
      statNote: parsed ? '' : 'No current season line',
    }
  })

  const standingsEntry = standings.children
    ?.flatMap((child) => child.standings?.entries || [])
    .find((entry) => entry.team?.id === PACERS_TEAM_ID)
  const standingStats = statLookup(standingsEntry?.stats)
  const recordStats = statLookup(team.team?.record?.items?.find((item) => item.type === 'total')?.stats)
  const aggregateStats = aggregatePlayerStats(playerStats)
  const games = mapGames(scoreboard)
  const wikitext = wikiParse.parse?.wikitext || ''
  const founded = extractInfoboxValue(wikitext, 'founded') || '1967'
  const arena = extractInfoboxValue(wikitext, 'arena') || 'Gainbridge Fieldhouse'
  const leagueChamps = extractInfoboxValue(wikitext, 'league_champs')
  const conferenceChamps = extractInfoboxValue(wikitext, 'conf_champs')
  const divisionChamps = extractInfoboxValue(wikitext, 'div_champs')
  const retiredNumbers = extractInfoboxValue(wikitext, 'ret_nums')
  const fetchedAt = new Date().toISOString()

  return {
    source: {
      fetchedAt,
      updatedLabel: new Date(fetchedAt).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }),
      season: `${seasonYear - 1}-${String(seasonYear).slice(-2)}`,
      stale: false,
      warning: '',
    },
    teamProfile: {
      name: team.team?.displayName || 'Indiana Pacers',
      location: team.team?.location || 'Indiana',
      arena,
      conference: 'Eastern Conference',
      division: team.team?.standingSummary || 'Central Division',
      founded,
      colors: [`#${team.team?.color || '002D62'}`, `#${team.team?.alternateColor || 'FDBB30'}`],
      identity: wikiSummary.extract || '',
      record: standingStats.overall?.displayValue || team.team?.record?.items?.[0]?.summary || '0-0',
      pace: null,
      netRating: recordStats.differential?.value || standingStats.differential?.value || 0,
      offensiveRating: recordStats.avgPointsFor?.value || standingStats.avgPointsFor?.value || 0,
      defensiveRating: recordStats.avgPointsAgainst?.value || standingStats.avgPointsAgainst?.value || 0,
      standingSummary: team.team?.standingSummary || '',
      logo: team.team?.logos?.[0]?.href || '',
    },
    roster: athletes.map((athlete) => ({
      id: athlete.id,
      name: athlete.displayName,
      position: athlete.position?.abbreviation || athlete.position?.displayName || '-',
      height: athlete.displayHeight || '-',
      weight: athlete.weight || 0,
      age: athlete.age || '-',
      number: athlete.jersey || '-',
      experience: athlete.experience?.years || 0,
      headshot: athlete.headshot?.href || '',
      courtImage: playerCourtImage(athlete),
      courtImagePosition: playerCourtImagePosition(athlete),
      bio: {
        birthPlace: [athlete.birthPlace?.city, athlete.birthPlace?.state, athlete.birthPlace?.country]
          .filter(Boolean)
          .join(', '),
        college: athlete.college?.name || '',
        displayHeight: athlete.displayHeight || '-',
        displayWeight: athlete.displayWeight || `${athlete.weight || '-'} lbs`,
      },
      links: mapAthleteLinks(athlete.links),
      socialLinks: mapSocialLinks(athlete.links),
      status: athlete.status?.type || '',
    })),
    playerStats,
    teamStats: buildTeamStats(standingStats, aggregateStats),
    seasonPerformance: monthlyPerformance(games),
    recentGames: games.slice(-8).reverse(),
    achievements: [
      parseAchievement('League championships', leagueChamps, 'league'),
      parseAchievement('Conference titles', conferenceChamps, 'conference'),
      parseAchievement('Division titles', divisionChamps, 'division'),
      parseAchievement('Retired numbers', retiredNumbers, 'retired'),
      { label: 'Founded', value: founded, detail: 'Original ABA franchise', badges: [] },
    ].filter((item) => item.value && item.value !== '-'),
    milestones: [
      {
        year: founded,
        title: 'Born in Indianapolis',
        detail: `The franchise began play in ${founded} and now plays at ${arena}.`,
      },
      {
        year: '1970-73',
        title: 'ABA championship era',
        detail: leagueChamps || 'The Pacers built their first championship identity in the ABA.',
      },
      {
        year: '1976',
        title: 'Joined the NBA',
        detail: 'Indiana became an NBA member as part of the ABA-NBA merger.',
      },
      {
        year: 'Finals',
        title: 'Conference crowns',
        detail: conferenceChamps || 'The Pacers have represented the East on the league stage.',
      },
      {
        year: 'Division',
        title: 'Central Division standard',
        detail: divisionChamps || 'Indiana has stacked division banners across eras.',
      },
      {
        year: 'Rafters',
        title: 'Retired numbers',
        detail: retiredNumbers || 'The franchise honors its defining figures in the rafters.',
      },
    ],
  }
}

export async function getPacersLivePayload({ forceRefresh = false } = {}) {
  const now = Date.now()
  if (!forceRefresh && liveCache.payload && liveCache.expiresAt > now) return liveCache.payload

  try {
    const payload = await buildPacersPayload()
    liveCache = {
      expiresAt: now + CACHE_TTL_MS,
      staleUntil: now + STALE_TTL_MS,
      payload,
    }
    return payload
  } catch (error) {
    if (liveCache.payload && liveCache.staleUntil > now) {
      return {
        ...liveCache.payload,
        source: {
          ...liveCache.payload.source,
          stale: true,
          warning: 'Showing the last saved feed while the latest refresh warms back up.',
        },
      }
    }

    throw error
  }
}
