import { useOutletContext } from 'react-router-dom'
import { PacersRadarChart } from '../components/ui/charts/PacersRadarChart'

export function Overview() {
  const { data, insights } = useOutletContext()
  const { teamProfile } = data

  const radarData = [
    { metric: 'Offense', Pacers: 94, League: 73 },
    { metric: 'Passing', Pacers: 96, League: 72 },
    { metric: 'Pace', Pacers: 91, League: 70 },
    { metric: 'Shooting', Pacers: 86, League: 71 },
    { metric: 'Defense', Pacers: 59, League: 70 },
    { metric: 'Depth', Pacers: 84, League: 68 },
  ]

  return (
    <div className="grid gap-6">
      <section className="speed-lines relative overflow-hidden rounded-sm border border-[var(--brand-secondary)]/10 bg-gradient-to-br from-[var(--brand-primary)] via-[var(--brand-bg)] to-[var(--brand-primary)]">
        <div className="absolute -right-8 top-0 h-full w-32 bg-[var(--brand-secondary)]/5" style={{ transform: 'skewX(-12deg)' }} />
        <div className="absolute -right-4 top-0 h-full w-4 bg-[var(--brand-secondary)]/10" style={{ transform: 'skewX(-12deg)' }} />

        <div className="relative z-10 grid gap-8 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <p className="pacers-display-flat text-sm tracking-[0.3em] text-[var(--brand-secondary)]/50">{teamProfile.conference} · {teamProfile.division}</p>
              <h2 className="pacers-display gold-shimmer mt-4 text-6xl sm:text-8xl lg:text-[6.5rem]">
                Gold runs<br />through Indy.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#8a9bb5]">{teamProfile.identity}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'PPG', val: Number(teamProfile.offensiveRating || 0).toFixed(1), sub: 'Scoring output' },
                { label: 'OPP PPG', val: Number(teamProfile.defensiveRating || 0).toFixed(1), sub: 'Opponent scoring' },
                { label: 'EST.', val: teamProfile.founded, sub: teamProfile.arena },
              ].map((item) => (
                <div key={item.label} className="racing-stripe relative overflow-hidden border border-white/6 bg-[var(--brand-primary)] p-4" style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}>
                  <p className="pacers-display-flat text-[11px] tracking-[0.2em] text-[var(--brand-secondary)]/60">{item.label}</p>
                  <p className="pacers-display mt-2 text-4xl text-white">{item.val}</p>
                  <p className="mt-1 text-xs text-[#5a7090]">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/6 bg-white/[0.02] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="pacers-display-flat text-sm tracking-[0.18em] text-[var(--brand-secondary)]">Team DNA</p>
                <p className="text-sm text-[#5a7090]">Pace, pressure, depth profile</p>
              </div>
              <img src="/pacers-logo.svg" alt="" className="h-12 w-12 drop-shadow-[0_0_8px_rgba(253,187,48,0.2)]" />
            </div>
            <div className="mt-4 h-72">
              <PacersRadarChart data={radarData} />
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
                <div className="grid h-10 w-10 shrink-0 place-items-center bg-[var(--brand-secondary)]/10 text-[var(--brand-secondary)]" style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}>
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
