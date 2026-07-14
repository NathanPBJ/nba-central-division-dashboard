import { useMemo, useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { Search, ChevronRight, LayoutGrid, List as ListIcon } from 'lucide-react'
import { positions } from '../constants/config'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useDashboardStore } from '../store/useDashboardStore'
import { useSound } from '../hooks/useSound'

export function Roster() {
  const { data } = useOutletContext()
  const { roster } = data
  const [, setSearchParams] = useSearchParams()

  const {
    rosterQuery: query,
    setRosterQuery: setQuery,
    rosterPosition: position,
    setRosterPosition: setPosition,
    rosterSortKey: sortKey,
    setRosterSortKey: setSortKey
  } = useDashboardStore()

  const { playClick } = useSound()

  const filteredRoster = useMemo(() => {
    return roster
      .filter((player) => {
        const matchesQuery = player.name.toLowerCase().includes(query.toLowerCase())
        const matchesPosition = position === 'All' || 
                                player.position === position || 
                                (player.position && player.position.includes(position)) ||
                                (position.includes('G') && player.position === 'G') ||
                                (position.includes('F') && player.position === 'F')
        return matchesQuery && matchesPosition
      })
      .sort((a, b) => {
        if (sortKey === 'name') return a.name.localeCompare(b.name)
        return b[sortKey] - a[sortKey]
      })
  }, [position, query, roster, sortKey])

  const openPlayerDrawer = (id) => {
    playClick()
    setSearchParams((prev) => {
      prev.set('player', id)
      return prev
    })
  }

  const [viewMode, setViewMode] = useState('grid')

  return (
    <div>
      <SectionHeader kicker="Rotation" title="Active Roster" />

      <div className="mb-6 flex flex-wrap gap-2 sm:grid sm:grid-cols-[1fr_auto_auto_auto]">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5a7090]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search player"
            className="h-11 w-full border border-white/8 bg-white/4 pl-9 pr-3 text-sm text-white outline-none transition focus:border-[var(--brand-secondary)]/40 focus:bg-white/6"
          />
        </label>
        <select value={position} onChange={(event) => setPosition(event.target.value)} className="pacers-select h-11 border border-white/8 bg-[var(--brand-primary)] px-3 text-sm font-bold text-white outline-none focus:border-[var(--brand-secondary)]/40">
          {positions.map((item) => (
            <option key={item} value={item}>{item === 'All' ? 'All positions' : item}</option>
          ))}
        </select>
        <select value={sortKey} onChange={(event) => setSortKey(event.target.value)} className="pacers-select h-11 border border-white/8 bg-[var(--brand-primary)] px-3 text-sm font-bold text-white outline-none focus:border-[var(--brand-secondary)]/40">
          <option value="name">Sort by name</option>
          <option value="age">Sort by age</option>
          <option value="weight">Sort by weight</option>
          <option value="experience">Sort by experience</option>
        </select>
        <div className="flex bg-white/4 border border-white/8">
          <button
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
            className={`grid h-11 w-11 place-items-center transition-colors ${viewMode === 'grid' ? 'bg-[var(--brand-secondary)]/20 text-[var(--brand-secondary)]' : 'text-[#5a7090] hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            aria-label="List view"
            className={`grid h-11 w-11 place-items-center transition-colors ${viewMode === 'list' ? 'bg-[var(--brand-secondary)]/20 text-[var(--brand-secondary)]' : 'text-[#5a7090] hover:bg-white/5 hover:text-white'}`}
          >
            <ListIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {filteredRoster.length === 0 && (
        <p className="py-16 text-center text-sm font-bold text-[#5a7090]">No players match this filter.</p>
      )}

      {viewMode === 'grid' ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredRoster.map((player, index) => (
            <article
              key={player.id}
              role="button"
              tabIndex={0}
              onClick={() => openPlayerDrawer(player.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') openPlayerDrawer(player.id)
              }}
              className="card-tilt animate-fade-up group relative cursor-pointer overflow-hidden border border-white/6 bg-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]/40"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="pacers-display absolute -right-4 -top-4 text-[7rem] leading-none text-[var(--brand-secondary)]/[0.04] transition-colors group-hover:text-[var(--brand-secondary)]/[0.08]">
                {player.number}
              </div>

              <div className="absolute right-12 top-0 h-full w-[3px] bg-gradient-to-b from-[var(--brand-secondary)]/30 via-[var(--brand-secondary)]/10 to-transparent transition-colors group-hover:from-[var(--brand-secondary)]/60 group-hover:via-[var(--brand-secondary)]/20" style={{ transform: 'skewX(-8deg)' }} />

              <div className="relative z-10 p-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden border-2 border-[var(--brand-secondary)]/40 bg-[var(--brand-primary)] transition group-hover:border-[var(--brand-secondary)]" style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}>
                    {player.headshot ? (
                      <img src={player.headshot} alt="" className="h-full w-full object-cover object-top" />
                    ) : (
                      <div className="grid h-full place-items-center">
                        <span className="pacers-display text-2xl text-[var(--brand-secondary)]">
                          {player.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-1">
                      <span className="pacers-display-flat bg-[var(--brand-secondary)] px-2 py-0.5 text-xs text-[var(--brand-primary)]">#{player.number}</span>
                      <span className="pacers-display-flat bg-white/8 px-2 py-0.5 text-xs text-[var(--brand-secondary)]">{player.position}</span>
                    </div>
                    <h3 className="mt-2 truncate text-lg font-black text-white">{player.name}</h3>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#5a7090]">{player.status || 'active'}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                  {[
                    ['HT', player.height],
                    ['WT', player.weight],
                    ['AGE', player.age],
                    ['EXP', player.experience],
                  ].map(([label, val]) => (
                    <div key={label} className="border border-white/4 bg-white/3 py-2">
                      <p className="pacers-display-flat text-[9px] tracking-[0.2em] text-[#5a7090]">{label}</p>
                      <p className="pacers-display-flat mt-0.5 text-sm tabular-nums text-white">{val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-1 border-t border-white/4 bg-white/[0.02] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#5a7090] transition group-hover:bg-[var(--brand-secondary)]/8 group-hover:text-[var(--brand-secondary)]">
                View Profile <ChevronRight className="h-3 w-3" />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredRoster.map((player, index) => (
            <article
              key={player.id}
              role="button"
              tabIndex={0}
              onClick={() => openPlayerDrawer(player.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') openPlayerDrawer(player.id)
              }}
              className="animate-fade-up group flex items-center justify-between gap-4 border border-white/6 bg-[var(--brand-primary)] p-3 pr-4 transition-colors hover:border-[var(--brand-secondary)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]/40"
              style={{ animationDelay: `${index * 20}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-[var(--brand-secondary)]/40 bg-[var(--brand-primary)]">
                  {player.headshot ? (
                    <img src={player.headshot} alt="" className="h-full w-full object-cover object-top" />
                  ) : (
                    <div className="grid h-full place-items-center">
                      <span className="pacers-display text-sm text-[var(--brand-secondary)]">
                        {player.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="w-10 text-center">
                  <span className="pacers-display-flat text-[var(--brand-secondary)]">#{player.number}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-black text-white">{player.name}</h3>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="hidden text-right text-sm text-[#5a7090] sm:block">
                  {player.position}
                </div>
                <div className="hidden text-right text-sm tabular-nums text-white lg:block">
                  {player.height} / {player.weight} lbs
                </div>
                <ChevronRight className="h-4 w-4 text-[#5a7090] transition-colors group-hover:text-[var(--brand-secondary)]" />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
