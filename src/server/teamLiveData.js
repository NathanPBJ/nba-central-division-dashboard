import { teamsCentral } from '../data/franchiseHistory.js'
import nbaPlayerIds from '../data/nbaPlayerIds.js'

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
  'Taelon Peter': '/players/taelon-peter.jpeg',
  'Ethan Thompson': '/players/ethan-thompson.jpeg',
  'Jalen Slawson': '/players/jalen-slawson.jpeg',
  'Pascal Siakam': '/players/pascal-siakam.jpeg',
  'Braden Smith': '/players/braden-smith.webp',
  'Kelly Oubre Jr.': '/players/kelly-oubre-jr.webp',
  'Larry Nance Jr.': '/players/larry-nance-jr.jpg',
  // Chicago Bulls
  'Tobe Awaka': '/players/tobe-awaka.webp',
  'Matas Buzelis': '/players/matas-buzelis.webp',
  'Nic Claxton': '/players/nic-claxton.webp',
  'Zach Collins': '/players/zach-collins.jpg',
  'Rob Dillingham': '/players/rob-dillingham.webp',
  'Noa Essengue': '/players/noa-essengue.jpg',
  'Josh Giddey': '/players/josh-giddey.avif',
  'Tre Jones': '/players/tre-jones.jpg',
  'Mac McClung': '/players/mac-mclung.avif',
  'Leonard Miller': '/players/leonard-miller.avif',
  'Isaac Okoro': '/players/isaac-okoro.webp',
  'Norman Powell': '/players/norman-powell.jpg',
  'Jalen Smith': '/players/jalen-smith.jpg',
  'Dailyn Swain': '/players/dailyn-swain.webp',
  'Patrick Williams': '/players/patrick-williams.jpg',
  'Caleb Wilson': '/players/caleb-wilson.jpg',
  'Guerschon Yabusele': '/players/guerschon-yabusele.webp',
  // Milwaukee Bucks
  'Nate Ament': '/players/nate-ament.jpg',
  'Brayden Burries': '/players/brayden-burries.jpg',
  'Ousmane Dieng': '/players/ousmane-dieng.avif',
  'AJ Green': '/players/aj-green.avif',
  'Tyler Herro': '/players/tyler-herro.jpg',
  'Kasparas Jakucionis': '/players/kasparas-jakucionis.jpg',
  'Jaime Jaquez Jr.': '/players/jamie-jaquez-jr.avif',
  'Kam Jones': '/players/kam-jones.jpeg',
  'Kyle Kuzma': '/players/kyle-kuzma.avif',
  'Caris LeVert': '/players/caris-levert.jpg',
  'Malique Lewis': '/players/malique-lewis.jpg',
  'Bogoljub Markovic': '/players/bogoljub-markovic.webp',
  'Pete Nance': '/players/pete-nance.webp',
  'Kevin Porter Jr.': '/players/kevin-porter-jr.webp',
  'Ryan Rollins': '/players/ryan-rollins.avif',
  'Cormac Ryan': '/players/cormac-ryan.avif',
  'Jericho Sims': '/players/jericho-sims.jpg',
  'Gary Trent Jr.': '/players/gary-trent-jr.webp',
  'Myles Turner': '/players/myles-turner.jpeg',
  'Kel\'el Ware': '/players/kel\'el-ware.jpg',
  // Cleveland Cavaliers
  'Jarrett Allen': '/players/jarrett-allen.jpg',
  'Thomas Bryant': '/players/thomas-bryant.jpg',
  'Tristan Enaruna': '/players/tristan-enaruna.jpg',
  'James Harden': '/players/james-harden.webp',
  'Sam Merrill': '/players/sam merrill.jpg',
  'Riley Minix': '/players/riley minix.avif',
  'Donovan Mitchell': '/players/donovan-mitchell.jpg',
  'Evan Mobley': '/players/evan mobley.jpg',
  'Craig Porter Jr.': '/players/craig porter jr.jpg',
  'Tyrese Proctor': '/players/tyrese proctor.jpeg',
  'Olivier Sarr': '/players/Olivier Sarr.jpg',
  'Dennis Schroder': '/players/dennis schroder.jpg',
  'Max Strus': '/players/max strus.jpg',
  'Meleek Thomas': '/players/meleek-thomas.jpeg',
  'Nae\'Qwan Tomlin': '/players/Nae\'Qwan Tomlin.webp',
  'Jaylon Tyson': '/players/jaylon tyson.webp',
  'Ernest Udeh Jr.': '/players/ernest udeh jr.jpg',
  // Detroit Pistons
  'John Collins': '/players/john collins.jpg',
  'Cade Cunningham': '/players/cade-cunningham.webp',
  'Jalen Duren': '/players/jalen duren.avif',
  'Javonte Green': '/players/javonte green.jpg',
  'Elijah Harkless': '/players/elijah harkless.webp',
  'Gary Harris': '/players/gary harris.jpg',
  'Ronald Holland II': '/players/ronald holland II.webp',
  'Kevin Huerter': '/players/kevin huerter.jpg',
  'Daniss Jenkins': '/players/daniss jenkins.jpg',
  'Isaiah Joe': '/players/isiaiah joe.jpg',
  'Isaac Jones': '/players/isaac jones.jpg',
  'Chaz Lanier': '/players/chaz lanier.jpg',
  'Wendell Moore Jr.': '/players/wendell moore jr.jpg',
  'Ebuka Okorie': '/players/ebuka okorie.webp',
  'Ugonna Onyenso': '/players/ugonna onyenso.webp',
  'Taurean Prince': '/players/taurean prince.webp',
  'Paul Reed': '/players/paul reed.webp',
  'Duncan Robinson': '/players/duncan robinson.jpg',
  'Tolu Smith': '/players/tolu smith.jpg',
  'Ausar Thompson': '/players/ausar thompson.jpg',
}

const LOCAL_COURT_POSITIONS = {
  'Kobe Brown': 'object-[center_40%]',
  'Kam Jones': 'object-[center_30%]',
  'Jalen Slawson': 'object-[center_20%]',
  'Ben Sheppard': 'object-[center_10%]',
  'Obi Toppin': 'object-[center_10%]',
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

let liveCaches = {}

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

function parsePlayerStats(statsPayload, seasonYear, teamId) {
  const averages = statsPayload?.categories?.find((category) => category.name === 'averages')
  if (!averages) return null

  const names = averages.names || []
  const teamSeason =
    averages.statistics?.find(
      (row) => row.teamId === teamId && Number(row.season?.year) === seasonYear,
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

function mapGames(scoreboard, teamId) {
  return (scoreboard.events || [])
    .map((event) => {
      const competition = event.competitions?.[0]
      const competitors = competition?.competitors || []
      const teamMatch = competitors.find((entry) => entry.team?.id === teamId)
      const opponent = competitors.find((entry) => entry.team?.id !== teamId)
      const completed = event.status?.type?.completed

      if (!teamMatch || !opponent || !completed) return null

      const teamScore = Number(teamMatch.score)
      const opponentScore = Number(opponent.score)

      return {
        id: event.id,
        date: event.date,
        opponent: opponent.team?.abbreviation || opponent.team?.shortDisplayName,
        opponentName: opponent.team?.displayName,
        homeAway: teamMatch.homeAway,
        result: teamMatch.winner ? 'W' : 'L',
        score: `${teamScore}-${opponentScore}`,
        margin: teamScore - opponentScore,
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
  
  // Use NBA.com action pose if available, else fallback to ESPN action shot
  const nbaId = nbaPlayerIds[athlete.displayName]
  if (nbaId) {
    return `https://cdn.nba.com/headshots/nba/latest/1040x760/${nbaId}.png`
  }
  return `https://a.espncdn.com/i/headshots/nba/players/action/${athlete.id}.jpg`
}

function playerCourtImagePosition(athlete) {
  return LOCAL_COURT_POSITIONS[athlete.displayName] || 'object-[center_10%]'
}

async function buildTeamPayload(teamSlug) {
  const teamConfig = teamsCentral[teamSlug]
  if (!teamConfig) {
    throw new Error(`Team config not found for slug: ${teamSlug}`)
  }
  const { id: teamId, slug, wikiTitle } = teamConfig

  const seasonYear = currentEspnSeasonYear()
  const startDate = `${seasonYear - 1}1001`
  const endDate = `${seasonYear}0630`

  const [team, roster, standings, scoreboard, wikiSummary, wikiParse] = await Promise.all([
    fetchJson(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${slug}`),
    fetchJson(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${slug}/roster`),
    fetchJson('https://site.web.api.espn.com/apis/v2/sports/basketball/nba/standings?region=us&lang=en&contentorigin=espn'),
    fetchJson(
      `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?teams=${teamId}&dates=${startDate}-${endDate}`,
    ),
    fetchJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`),
    fetchJson(
      `https://en.wikipedia.org/w/api.php?action=parse&page=${wikiTitle}&prop=wikitext&format=json&formatversion=2&origin=*`,
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
        ? parsePlayerStats(playerStatsPayloads[index].value, seasonYear, teamId)
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
    .find((entry) => entry.team?.id === teamId)
  const standingStats = statLookup(standingsEntry?.stats)
  const recordStats = statLookup(team.team?.record?.items?.find((item) => item.type === 'total')?.stats)
  const aggregateStats = aggregatePlayerStats(playerStats)
  const games = mapGames(scoreboard, teamId)
  const wikitext = wikiParse.parse?.wikitext || ''
  const founded = extractInfoboxValue(wikitext, 'founded') || teamConfig.founded || '1967'
  const arena = extractInfoboxValue(wikitext, 'arena') || 'Arena'
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
      id: teamId,
      slug: slug,
      name: team.team?.displayName || 'NBA Team',
      location: team.team?.location || 'Location',
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
      conferenceRank: recordStats.playoffSeed?.value || 0,
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
      { label: 'Retired numbers', value: teamConfig.retiredNumbers, detail: '', badges: [], type: 'retired' },
      { label: 'Founded', value: founded, detail: '', badges: [] },
    ].filter((item) => item.value && item.value !== '-'),
    milestones: teamConfig.extendedHistory || [],
    legends: teamConfig.legends || []
  }
}

export async function getTeamLivePayload(teamSlug, { forceRefresh = false } = {}) {
  const now = Date.now()
  let liveCache = liveCaches[teamSlug]
  if (!liveCache) {
    liveCache = { expiresAt: 0, staleUntil: 0, payload: null }
    liveCaches[teamSlug] = liveCache
  }

  if (!forceRefresh && liveCache.payload && liveCache.expiresAt > now) return liveCache.payload

  try {
    const payload = await buildTeamPayload(teamSlug)
    liveCaches[teamSlug] = {
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
