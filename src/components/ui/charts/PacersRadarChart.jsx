import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { C_GOLD, C_SILVER } from '../../../constants/theme'
import { ChartTooltip } from '../ChartTooltip'

export function PacersRadarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(253,187,48,0.08)" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: '#7a8ea6', fontSize: 11, fontWeight: 600 }} />
        <Radar dataKey="League" stroke={C_SILVER} fill={C_SILVER} fillOpacity={0.08} />
        <Radar dataKey="Pacers" stroke={C_GOLD} fill={C_GOLD} fillOpacity={0.2} strokeWidth={2} />
        <Legend iconType="diamond" wrapperStyle={{ color: '#7a8ea6', fontSize: 11 }} />
        <Tooltip content={<ChartTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
