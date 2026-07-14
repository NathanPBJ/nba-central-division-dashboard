import { Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { C_GOLD, C_NAVY, C_GRID, C_TICK } from '../../../constants/theme'
import { ChartTooltip } from '../ChartTooltip'

export function PacersBarChart({ 
  data, 
  layout = 'horizontal', 
  primaryDataKey, 
  secondaryDataKey, 
  primaryName, 
  secondaryName,
  xAxisDataKey,
  yAxisDataKey,
  highlightFirst = false 
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout={layout} margin={{ left: 16, right: 18 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={layout === 'horizontal'} vertical={layout === 'vertical'} stroke={C_GRID} />
        
        {layout === 'vertical' ? (
          <>
            <XAxis type="number" tick={{ fill: C_TICK, fontSize: 12 }} />
            <YAxis dataKey={yAxisDataKey} type="category" width={92} tick={{ fill: '#c8d6e5', fontSize: 11, fontWeight: 600 }} />
          </>
        ) : (
          <>
            <XAxis dataKey={xAxisDataKey} tick={{ fill: C_TICK, fontSize: 11 }} interval={0} angle={-18} textAnchor="end" height={92} />
            <YAxis yAxisId="left" tick={{ fill: C_TICK, fontSize: 12 }} />
            {secondaryDataKey && <YAxis yAxisId="right" orientation="right" tick={{ fill: C_TICK, fontSize: 12 }} reversed />}
          </>
        )}

        <Tooltip content={<ChartTooltip />} cursor={{ fill: 'color-mix(in srgb, var(--brand-secondary) 5%, transparent)' }} />
        
        {secondaryDataKey ? (
          <Legend iconType="diamond" wrapperStyle={{ fontSize: 11, color: '#7a8ea6' }} />
        ) : null}

        <Bar yAxisId={layout === 'horizontal' ? 'left' : undefined} dataKey={primaryDataKey} name={primaryName} radius={layout === 'vertical' ? [0, 4, 4, 0] : [4, 4, 0, 0]} fill={C_NAVY}>
          {highlightFirst && data.map((entry, index) => (
            <Cell key={entry.id || index} fill={index === 0 ? C_GOLD : C_NAVY} />
          ))}
        </Bar>
        
        {secondaryDataKey && (
          <Bar yAxisId="right" dataKey={secondaryDataKey} name={secondaryName} fill={C_GOLD} radius={[4, 4, 0, 0]} />
        )}
      </BarChart>
    </ResponsiveContainer>
  )
}
