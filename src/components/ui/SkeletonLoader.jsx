export function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[var(--brand-bg)]/60 backdrop-blur-3xl p-4 lg:px-6">
        <div className="mx-auto max-w-7xl flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4 animate-pulse">
            <div className="w-16 h-16 rounded-full bg-white/10" />
            <div className="space-y-2">
              <div className="w-24 h-3 bg-[var(--brand-secondary)]/30 rounded" />
              <div className="w-48 h-8 bg-white/20 rounded" />
              <div className="w-32 h-3 bg-white/10 rounded" />
            </div>
          </div>
          <div className="flex gap-2 animate-pulse">
            <div className="w-24 h-14 bg-white/5 rounded border border-white/5" />
            <div className="w-24 h-14 bg-white/5 rounded border border-white/5" />
            <div className="w-24 h-14 bg-white/5 rounded border border-white/5" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-4 flex gap-2 animate-pulse">
            <div className="w-20 h-8 bg-white/10 rounded" />
            <div className="w-20 h-8 bg-white/10 rounded" />
            <div className="w-20 h-8 bg-white/10 rounded" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="w-full h-64 bg-white/5 rounded-2xl border border-white/5" />
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full h-40 bg-white/5 rounded-xl border border-white/5" />
              <div className="w-full h-40 bg-white/5 rounded-xl border border-white/5" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="w-full h-24 bg-white/5 rounded-xl border border-white/5" />
            <div className="w-full h-24 bg-white/5 rounded-xl border border-white/5" />
            <div className="w-full h-24 bg-white/5 rounded-xl border border-white/5" />
            <div className="w-full h-24 bg-white/5 rounded-xl border border-white/5" />
          </div>
        </div>
      </main>
    </div>
  )
}
