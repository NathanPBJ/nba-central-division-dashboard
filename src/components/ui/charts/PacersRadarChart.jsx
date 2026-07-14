import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { C_SILVER } from '../../../constants/theme'
import { ChartTooltip } from '../ChartTooltip'

/**
 * teamKey – the data key in each radar data entry that holds the team's value.
 * e.g. 'Pacers' | 'Bulls' | 'Bucks' | 'Cavaliers' | 'Pistons'
 * Falls back to 'Pacers' for backward compatibility.
 */
export function PacersRadarChart({ data, teamKey = 'Pacers', teamColor }) {
  // teamColor comes from CSS var at runtime; default to gold
  const color = teamColor || 'var(--brand-secondary)'

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.06)" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: '#7a8ea6', fontSize: 11, fontWeight: 600 }} />
        <Radar dataKey="League" stroke={C_SILVER} fill={C_SILVER} fillOpacity={0.08} name="League" />
        <Radar
          dataKey={teamKey}
          stroke={color}
          fill={color}
          fillOpacity={0.2}
          strokeWidth={2}
          name={teamKey}
        />
        <Legend iconType="diamond" wrapperStyle={{ color: '#7a8ea6', fontSize: 11 }} />
        <Tooltip content={<ChartTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
