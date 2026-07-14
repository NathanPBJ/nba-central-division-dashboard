import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { statOptions } from '../constants/config'
import { hasStatLine, sortableValue, statValue } from '../utils/helpers'
import { SectionHeader } from '../components/ui/SectionHeader'
import { GoldDivider } from '../components/ui/GoldDivider'
import { PacersBarChart } from '../components/ui/charts/PacersBarChart'
import { PacersLineChart } from '../components/ui/charts/PacersLineChart'
import { useDashboardStore } from '../store/useDashboardStore'
import { Button } from '../components/ui/Button'
import { C_GOLD, C_SILVER } from '../constants/theme'

export function Leaders() {
  const { data } = useOutletContext()
  const { playerStats } = data

  const {
    leadersStatSort: statSort,
    setLeadersStatSort: setStatSort,
    leadersSelectedPlayers: selectedPlayers,
    toggleLeadersPlayer: togglePlayer
  } = useDashboardStore()

  const sortedStats = useMemo(() => {
    return [...playerStats].sort((a, b) => sortableValue(b[statSort]) - sortableValue(a[statSort]))
  }, [playerStats, statSort])

  const statLinePlayers = playerStats.filter(hasStatLine)
  const chartData = sortedStats.filter(hasStatLine).slice(0, 8)
  const selectedStats = statLinePlayers.filter((player) => selectedPlayers.includes(player.id))

  const linesConfig = [
    { dataKey: 'pts', name: 'PTS', color: C_GOLD },
    { dataKey: 'ast', name: 'AST', color: '#4facfe' },
    { dataKey: 'reb', name: 'REB', color: C_SILVER },
  ]

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="border border-white/6 bg-[var(--brand-primary)]/60 p-5 lg:p-6">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader kicker="Leaders" title="Stat Leaders" />
          <select
            value={statSort}
            onChange={(event) => setStatSort(event.target.value)}
            className="pacers-select h-11 border border-white/8 bg-[var(--brand-primary)] px-3 text-sm font-bold text-white outline-none focus:border-[var(--brand-secondary)]/40"
          >
            {statOptions.map((option) => (
              <option key={option.key} value={option.key}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="h-96 sm:h-80">
          <PacersBarChart 
            data={chartData} 
            layout="vertical"
            yAxisDataKey="name"
            primaryDataKey={statSort}
            highlightFirst={true}
          />
        </div>

        <GoldDivider />

        <div className="overflow-x-auto">
          <table className="stat-table w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--brand-secondary)]/15">
                <th className="py-3">Player</th>
                <th>PTS</th>
                <th>REB</th>
                <th>AST</th>
                <th>STL</th>
                <th>BLK</th>
                <th>FG%</th>
                <th>3P%</th>
                <th>MIN</th>
              </tr>
            </thead>
            <tbody>
              {sortedStats.map((player) => (
                <tr key={player.id} className="border-b border-white/4 transition hover:bg-[var(--brand-secondary)]/[0.03]">
                  <td className="py-3 font-black text-white">{player.name}</td>
                  <td className="tabular-nums text-[#c8d6e5]">{statValue(player.pts)}</td>
                  <td className="tabular-nums text-[#c8d6e5]">{statValue(player.reb)}</td>
                  <td className="tabular-nums text-[#c8d6e5]">{statValue(player.ast)}</td>
                  <td className="tabular-nums text-[#c8d6e5]">{statValue(player.stl)}</td>
                  <td className="tabular-nums text-[#c8d6e5]">{statValue(player.blk)}</td>
                  <td className="tabular-nums text-[#c8d6e5]">{statValue(player.fg)}</td>
                  <td className="tabular-nums text-[#c8d6e5]">{statValue(player.three)}</td>
                  <td>
                    {hasStatLine(player) ? (
                      <span className="tabular-nums text-[#c8d6e5]">{statValue(player.min)}</span>
                    ) : (
                      <span className="text-[#5a7090]">{player.statNote || 'No current minutes'}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-white/6 bg-[var(--brand-primary)]/60 p-5 lg:p-6">
        <SectionHeader kicker="Matchups" title="Player Comparison" />
        <div className="mb-4 flex flex-wrap gap-2">
          {playerStats.map((player) => (
            <Button
              key={player.id}
              intent={selectedPlayers.includes(player.id) ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => togglePlayer(player.id)}
              disabled={!hasStatLine(player)}
            >
              {player.name.split(' ').slice(-1)[0]}
            </Button>
          ))}
        </div>
        <div className="h-80">
          <PacersLineChart 
            data={selectedStats}
            xAxisKey="name"
            lines={linesConfig}
          />
        </div>
      </div>
    </div>
  )
}
