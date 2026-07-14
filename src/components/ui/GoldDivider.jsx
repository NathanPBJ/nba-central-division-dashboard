export function GoldDivider() {
  return (
    <div className="my-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--brand-secondary)]/30 to-transparent" />
      <div className="h-2 w-2 rotate-45 bg-[var(--brand-secondary)]/40" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--brand-secondary)]/30 to-transparent" />
    </div>
  )
}
