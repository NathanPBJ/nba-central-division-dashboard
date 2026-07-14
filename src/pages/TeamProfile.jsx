import { useOutletContext } from 'react-router-dom'
import { SectionHeader } from '../components/ui/SectionHeader'
import { PacersBarChart } from '../components/ui/charts/PacersBarChart'

export function TeamProfile() {
  const { data } = useOutletContext()
  const { teamStats } = data

  const chartStats = teamStats.map((stat) => ({
    ...stat,
    chartValue: Number.parseFloat(stat.value) || 0,
    rankValue: Number.parseFloat(stat.rankValue ?? stat.rank) || 0,
  }))

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="border border-white/6 bg-[var(--brand-primary)]/60 p-5 lg:p-6">
        <SectionHeader kicker="Team Profile" title="Season Marks" />
        <div className="grid gap-2">
          {teamStats.map((stat, index) => (
            <div
              key={stat.metric}
              className="animate-slide-in group relative overflow-hidden border border-white/4 bg-white/[0.02] p-4 transition hover:border-[var(--brand-secondary)]/20 hover:bg-white/[0.04]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-white">{stat.metric}</p>
                  <p className="text-sm text-[#5a7090]">{stat.context ?? `League avg: ${stat.leagueAvg}`}</p>
                </div>
                <div className="text-right">
                  <p className="pacers-display text-3xl tabular-nums text-[var(--brand-secondary)]">{stat.value}</p>
                  <p className="pacers-display-flat text-[10px] tracking-[0.14em] text-[#5a7090]">{stat.rankLabel ?? `Rank ${stat.rank}`}</p>
                </div>
              </div>
              <div className="mt-3 h-1 bg-white/6">
                <div
                  className="h-1 bg-gradient-to-r from-[var(--brand-secondary)] to-[var(--brand-secondary)]/40 transition-all duration-700"
                  style={{ width: `${(stat.rankValue ?? stat.rank) ? Math.max(18, 100 - Number(stat.rankValue ?? stat.rank) * 3) : 64}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-white/6 bg-[var(--brand-primary)]/60 p-5 lg:p-6">
        <SectionHeader kicker="Profile" title="Standings Context" />
        <div className="h-[34rem] sm:h-[30rem]">
          <PacersBarChart 
            data={chartStats}
            layout="horizontal"
            xAxisDataKey="metric"
            primaryDataKey="chartValue"
            primaryName="Pacers value"
            secondaryDataKey="rankValue"
            secondaryName="Conference seed"
          />
        </div>
      </div>
    </div>
  )
}
