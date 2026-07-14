import { useOutletContext, useParams } from 'react-router-dom'
import { PacersRadarChart } from '../components/ui/charts/PacersRadarChart'
import { TEAM_THEMES, getTeamLogoUrl } from '../constants/teamThemes'

export function Overview() {
  const { data, insights } = useOutletContext()
  const { teamProfile } = data
  const { teamSlug } = useParams()

  const teamTheme = TEAM_THEMES[teamSlug] || TEAM_THEMES['ind']
  const radarKey = teamTheme.radarKey        // e.g. 'Bulls', 'Cavaliers', 'Pacers' …
  const headline = teamTheme.headline        // e.g. 'Six rings.\nForever.'
  const logoUrl = getTeamLogoUrl(teamSlug)   // ESPN CDN PNG

  // Radar data uses the team's radarKey dynamically
  const radarData = [
    { metric: 'Offense',  [radarKey]: 94, League: 73 },
    { metric: 'Passing',  [radarKey]: 96, League: 72 },
    { metric: 'Pace',     [radarKey]: 91, League: 70 },
    { metric: 'Shooting', [radarKey]: 86, League: 71 },
    { metric: 'Defense',  [radarKey]: 59, League: 70 },
    { metric: 'Depth',    [radarKey]: 84, League: 68 },
  ]

  // Split headline on '\n' for line breaks
  const headlineLines = headline.split('\n')

  return (
    <div className="grid gap-6">
      <section className="speed-lines relative overflow-hidden rounded-sm border border-[var(--brand-secondary)]/10 bg-gradient-to-br from-[var(--brand-primary)] via-[var(--brand-bg)] to-[var(--brand-primary)]">
        <div className="absolute -right-8 top-0 h-full w-32 bg-[var(--brand-secondary)]/5" style={{ transform: 'skewX(-12deg)' }} />
        <div className="absolute -right-4 top-0 h-full w-4 bg-[var(--brand-secondary)]/10" style={{ transform: 'skewX(-12deg)' }} />

        <div className="relative z-10 grid gap-8 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <p className="pacers-display-flat text-sm tracking-[0.3em] text-[var(--brand-secondary)]/50">
                {teamProfile.conference} · {teamProfile.division}
              </p>
              <h2 className="pacers-display gold-shimmer mt-4 text-6xl sm:text-8xl lg:text-[6.5rem]">
                {headlineLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < headlineLines.length - 1 && <br />}
                  </span>
                ))}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#8a9bb5]">{teamProfile.identity}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'PPG',     val: Number(teamProfile.offensiveRating || 0).toFixed(1), sub: 'Scoring output' },
                { label: 'OPP PPG', val: Number(teamProfile.defensiveRating || 0).toFixed(1), sub: 'Opponent scoring' },
                { label: 'EST.',    val: teamProfile.founded, sub: teamProfile.arena },
              ].map((item) => (
                <div
                  key={item.label}
                  className="racing-stripe relative overflow-hidden border border-white/6 bg-[var(--brand-primary)] p-4"
                  style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
                >
                  <p className="pacers-display-flat text-[11px] tracking-[0.2em] text-[var(--brand-secondary)]/60">{item.label}</p>
                  <p className="pacers-display mt-2 text-4xl text-white">{item.val}</p>
                  <p className="mt-1 text-xs text-[#5a7090]">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team DNA radar */}
          <div className="border border-white/6 bg-white/[0.02] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="pacers-display-flat text-sm tracking-[0.18em] text-[var(--brand-secondary)]">Team DNA</p>
                <p className="text-sm text-[#5a7090]">Pace, pressure, depth profile</p>
              </div>
              {/* Correct team logo from ESPN CDN */}
              <img
                src={logoUrl}
                alt={teamProfile.name}
                className="h-12 w-12 object-contain"
                style={{ filter: `drop-shadow(0 0 8px var(--brand-secondary))` }}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <div className="mt-4 h-72">
              <PacersRadarChart data={radarData} teamKey={radarKey} />
            </div>

            {/* Current Standing & Record Block */}
            <div className="mt-6 flex flex-col gap-3 border-t border-[var(--brand-secondary)]/20 pt-5">
              
              {/* Standings Row */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#5a7090]">Standings</span>
                <div className="flex flex-col items-end gap-1 text-right">
                  {teamProfile.standingSummary && teamProfile.standingSummary.includes(' in ') && (
                    <span className="pacers-display text-lg text-[var(--brand-secondary)] leading-none">
                      {teamProfile.standingSummary.split(' in ')[0].replace(/[^0-9]/g, '')}
                      <span className="text-[10px] text-[var(--brand-secondary)]/70 uppercase ml-[1px]">
                        {teamProfile.standingSummary.split(' in ')[0].replace(/[0-9]/g, '')}
                      </span>
                      <span className="text-[10px] text-white/70 tracking-widest uppercase ml-2">
                        {teamProfile.standingSummary.split(' in ')[1]}
                      </span>
                    </span>
                  )}
                  {teamProfile.conferenceRank > 0 && (
                    <span className="pacers-display text-base text-white/90 leading-none">
                      {teamProfile.conferenceRank}
                      <span className="text-[9px] text-white/50 uppercase ml-[1px]">
                        {teamProfile.conferenceRank === 1 ? 'st' : teamProfile.conferenceRank === 2 ? 'nd' : teamProfile.conferenceRank === 3 ? 'rd' : 'th'}
                      </span>
                      <span className="text-[10px] text-white/50 tracking-widest uppercase ml-2">
                        EASTERN CONFERENCE
                      </span>
                    </span>
                  )}
                </div>
              </div>

              {/* Efficiency Row */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#5a7090]">Efficiency</span>
                <div className="flex gap-5">
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest">Offense</span>
                    <span className="pacers-display text-lg text-[#00ff9d]">
                      {teamProfile.offensiveRating?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest">Defense</span>
                    <span className="pacers-display text-lg text-[#ff3366]">
                      {teamProfile.defensiveRating?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Record Row */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#5a7090]">Overall Record</span>
                <span className="pacers-display text-xl text-[var(--brand-secondary)]">
                  {teamProfile.record}
                  <span className="text-[11px] text-white/70 tracking-widest uppercase ml-2">WIN-LOSS</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon
          return (
            <div
              key={insight.title}
              className="card-tilt animate-slide-in relative overflow-hidden border border-white/6 bg-[var(--brand-primary)]/80 p-4"
              style={{ animationDelay: `${index * 80}ms`, clipPath: 'polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
            >
              <div className="absolute -right-1 top-0 h-full w-1.5 bg-[var(--brand-secondary)]/40" style={{ transform: 'skewX(-4deg)' }} />
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <p className="pacers-display-flat text-[11px] tracking-[0.2em] text-[#5a7090]">{insight.title}</p>
                  <p className="mt-2 text-lg font-black text-white">{insight.value}</p>
                  <p className="mt-1 text-sm tabular-nums text-[var(--brand-secondary)]">{insight.detail}</p>
                </div>
                <div
                  className="grid h-10 w-10 shrink-0 place-items-center bg-[var(--brand-secondary)]/10 text-[var(--brand-secondary)]"
                  style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
