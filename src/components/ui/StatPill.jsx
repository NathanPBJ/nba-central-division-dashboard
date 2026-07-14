export function StatPill({ label, value, accent = false }) {
  return (
    <div className={`relative overflow-hidden rounded border px-4 py-3 ${accent ? 'border-[var(--brand-secondary)]/30 bg-[var(--brand-secondary)]/8' : 'border-white/8 bg-white/4'}`}>
      <p className="pacers-display-flat text-[11px] tracking-[0.16em] text-[var(--brand-secondary)]/60">{label}</p>
      <p className={`pacers-display-flat mt-1 text-2xl tabular-nums ${accent ? 'text-[var(--brand-secondary)]' : 'text-white'}`}>{value}</p>
    </div>
  )
}
