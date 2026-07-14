import { Shield, Star, TrendingUp, Zap } from 'lucide-react'

export function getInsights(playerStats, teamStats) {
  const statLines = playerStats.filter(hasStatLine)
  const topScorer = [...statLines].sort((a, b) => (b.pts || 0) - (a.pts || 0))[0]
  const bestPlaymaker = [...statLines].sort((a, b) => (b.ast || 0) - (a.ast || 0))[0]
  const mostEfficient = [...playerStats]
    .filter((player) => hasStatLine(player) && (player.min > 18 || player.gp > 20))
    .sort((a, b) => (b.efg || b.fg || 0) - (a.efg || a.fg || 0))[0]
  const strongestMetric = teamStats[0]

  return [
    { title: 'Top scorer', value: topScorer?.name || '-', detail: `${topScorer?.pts || 0} PPG`, icon: Star },
    { title: 'Best playmaker', value: bestPlaymaker?.name || '-', detail: `${bestPlaymaker?.ast || 0} APG`, icon: Zap },
    { title: 'Most efficient', value: mostEfficient?.name || '-', detail: `${mostEfficient?.efg || mostEfficient?.fg || 0}% EFG`, icon: TrendingUp },
    { title: 'Team strength', value: strongestMetric?.metric || '-', detail: `${strongestMetric?.value || '-'}`, icon: Shield },
  ]
}

export function statValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  return `${value}`
}

export function sortableValue(value) {
  return Number.isFinite(Number(value)) ? Number(value) : -Infinity
}

export function hasStatLine(player) {
  return player.hasCurrentStats ?? true
}
