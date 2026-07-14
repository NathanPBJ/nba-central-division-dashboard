export function SectionHeader({ kicker, title }) {
  return (
    <div className="mb-6">
      <p className="pacers-display-flat text-sm tracking-[0.2em] text-[var(--brand-secondary)]/70">{kicker}</p>
      <h2 className="pacers-display mt-1 text-4xl text-white sm:text-5xl">{title}</h2>
      <div className="mt-3 h-1 w-20 bg-gradient-to-r from-[var(--brand-secondary)] to-transparent" style={{ transform: 'skewX(-20deg)' }} />
    </div>
  )
}
