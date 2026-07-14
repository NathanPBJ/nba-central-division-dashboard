import { useOutletContext } from 'react-router-dom'
import { SectionHeader } from '../components/ui/SectionHeader'
import { PacersAreaChart } from '../components/ui/charts/PacersAreaChart'

export function FormGuide() {
  const { data } = useOutletContext()
  const { seasonPerformance, recentGames } = data

  const linesConfig = [
    { dataKey: 'wins', name: 'Wins', color: '#4facfe' },
    { dataKey: 'losses', name: 'Losses', color: '#9ea2a2' },
  ]

  return (
    <div className="grid gap-6">
      <div className="border border-white/6 bg-[var(--brand-primary)]/60 p-5 lg:p-6">
        <SectionHeader kicker="Form Guide" title="Monthly Results Trend" />
        <div className="h-[24rem] sm:h-96">
          <PacersAreaChart 
            data={seasonPerformance}
            xAxisKey="month"
            areaKey="net"
            areaName="Avg margin"
            lines={linesConfig}
          />
        </div>
      </div>

      <div>
        <SectionHeader kicker="Recent Results" title="Last Eight Games" />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {recentGames.map((game, index) => {
            const isWin = game.result === 'W'
            return (
              <div
                key={`${game.opponent}-${game.score}`}
                className="animate-slide-in group relative overflow-hidden border border-white/6 bg-[var(--brand-primary)] transition hover:border-[var(--brand-secondary)]/20"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className={`absolute left-0 top-0 h-full w-1 ${isWin ? 'bg-emerald-400' : 'bg-rose-400'}`} />

                <div className="p-4 pl-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[#7a8ea6]">vs {game.opponent}</p>
                    <span className={`pacers-display-flat px-2.5 py-0.5 text-xs ${isWin ? 'bg-emerald-400/15 text-emerald-300' : 'bg-rose-400/15 text-rose-300'}`}>
                      {game.result}
                    </span>
                  </div>
                  <p className="pacers-display mt-3 text-3xl text-white">{game.score}</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="tabular-nums text-[#5a7090]">
                      {game.margin > 0 ? `+${game.margin}` : game.margin}
                    </span>
                    <span className="pacers-display-flat text-[10px] tracking-[0.18em] text-[#5a7090]">
                      {game.homeAway === 'home' ? 'HOME' : 'AWAY'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
