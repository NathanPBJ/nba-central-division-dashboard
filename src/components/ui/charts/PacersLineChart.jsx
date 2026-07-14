import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { C_GOLD, C_SILVER, C_GRID, C_TICK } from '../../../constants/theme'
import { ChartTooltip } from '../ChartTooltip'

export function PacersLineChart({ data, xAxisKey, lines }) {
  const defaultColors = [C_GOLD, '#4facfe', C_SILVER, '#ff7eb3']

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={C_GRID} />
        <XAxis dataKey={xAxisKey} tick={{ fill: C_TICK, fontSize: 11 }} />
        <YAxis tick={{ fill: C_TICK, fontSize: 12 }} />
        <Tooltip content={<ChartTooltip />} />
        <Legend iconType="diamond" wrapperStyle={{ fontSize: 11, color: '#7a8ea6' }} />
        
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
              dot={{ r: 4, fill: color, stroke: color }} 
            />
          )
        })}
      </LineChart>
    </ResponsiveContainer>
  )
}
