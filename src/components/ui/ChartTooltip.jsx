export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      <div className="grid gap-1.5">
        {payload.map((entry) => (
          <div key={`${entry.name}-${entry.dataKey}`} className="chart-tooltip-row">
            <span>
              <span className="chart-tooltip-dot" style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
            <strong>{entry.value}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
