import { Area, AreaChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { C_GOLD, C_SILVER, C_GRID, C_TICK } from '../../../constants/theme'
import { ChartTooltip } from '../ChartTooltip'

export function PacersAreaChart({ data, xAxisKey, areaKey, areaName, lines }) {
  const defaultColors = ['#4facfe', C_SILVER, '#ff7eb3']

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`grad-${areaKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={C_GOLD} stopOpacity={0.35} />
            <stop offset="95%" stopColor={C_GOLD} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={C_GRID} />
        <XAxis dataKey={xAxisKey} tick={{ fill: C_TICK, fontSize: 12 }} />
        <YAxis tick={{ fill: C_TICK, fontSize: 12 }} />
        <Tooltip content={<ChartTooltip />} />
        <Legend iconType="diamond" wrapperStyle={{ fontSize: 11, color: '#7a8ea6' }} />
        
        <Area 
          type="monotone" 
          dataKey={areaKey} 
          name={areaName} 
          stroke={C_GOLD} 
          fill={`url(#grad-${areaKey})`} 
          strokeWidth={2.5} 
        />
        
        {lines.map((line, index) => {
          const color = line.color || defaultColors[index % defaultColors.length]
          return (
            <Line 
              key={line.dataKey}
              type="monotone" 
              dataKey={line.dataKey} 
              name={line.name} 
              stroke={color} 
              strokeWidth={2.5} 
            />
          )
        })}
      </AreaChart>
    </ResponsiveContainer>
  )
}
