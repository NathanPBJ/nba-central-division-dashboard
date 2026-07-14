import { useSearchParams } from 'react-router-dom'
import { ExternalLink, X } from 'lucide-react'
import { statValue, hasStatLine } from '../../utils/helpers'
import { useMemo } from 'react'

export function PlayerDrawer({ roster, playerStats, recentGames }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedPlayerId = searchParams.get('player')

  const selectedProfile = useMemo(() => {
    if (!selectedPlayerId) return null
    const player = roster?.find((item) => item.id === selectedPlayerId)
    if (!player) return null
    return {
      player,
      stats: playerStats?.find((item) => item.id === selectedPlayerId) || null,
    }
  }, [playerStats, roster, selectedPlayerId])

  if (!selectedProfile) return null

  const { player, stats } = selectedProfile
  const links = player.links?.slice(0, 6) || []
  const socialLinks = player.socialLinks || []

  const handleClose = () => {
    // Remove 'player' from search params without affecting other params
    const newParams = new URLSearchParams(searchParams)
    newParams.delete('player')
    setSearchParams(newParams)
  }

  return (
    <div className="fixed inset-0 z-40">
      <button type="button" aria-label="Close profile backdrop" onClick={handleClose} className="absolute inset-0 z-0 bg-black/70 backdrop-blur-sm" />
      <aside className="absolute bottom-0 right-0 top-auto z-10 flex max-h-[92svh] w-full flex-col overflow-hidden bg-[var(--brand-bg)]/60 backdrop-blur-3xl border-l border-white/10 text-white shadow-2xl shadow-black/60 md:top-0 md:h-full md:max-h-none md:w-[32rem]">
        <div className="bg-noise absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none z-0" />
        {/* Court image */}
        {player.courtImage ? (
          <img src={player.courtImage} alt={`${player.name} on court`} className={`absolute inset-0 h-full w-full object-cover ${player.courtImagePosition || 'object-[center_10%]'}`} />
        ) : (
          <div className="absolute inset-0 court-lines bg-[var(--brand-bg)]" />
        )}
        {/* Heavy gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--brand-bg)]/60 to-[var(--brand-bg)]" />

        {/* Close button */}
        <button type="button" aria-label="Close player profile" onClick={handleClose} className="absolute right-4 top-4 z-30 grid h-11 w-11 place-items-center bg-black/40 text-white shadow-lg backdrop-blur-md border border-white/10 rounded-full transition hover:bg-[var(--brand-secondary)]/20 hover:text-[var(--brand-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]/40">
          <X className="h-5 w-5" />
        </button>

        {/* Player header */}
        <div className="relative z-10 flex min-h-80 flex-col justify-end p-6">
          <div className="inline-flex w-fit items-center gap-1">
            <span className="pacers-display-flat bg-[var(--brand-secondary)] px-2.5 py-1 text-xs text-[var(--brand-primary)]">#{player.number}</span>
            <span className="pacers-display-flat bg-white/10 px-2.5 py-1 text-xs text-[var(--brand-secondary)] backdrop-blur-md">{player.position}</span>
          </div>
          <h2 className="pacers-display mt-3 text-5xl text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">{player.name}</h2>
        </div>

        {/* Scrollable content */}
        <div className="relative z-10 overflow-y-auto p-6 pt-0">
          {/* Stat pills */}
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              ['PTS', stats?.pts],
              ['REB', stats?.reb],
              ['AST', stats?.ast],
              ['MIN', stats?.min],
            ].map(([label, value]) => (
              <div key={label} className="border border-white/8 bg-white/6 p-3 backdrop-blur-md">
                <p className="pacers-display-flat text-[10px] tracking-[0.18em] text-[#5a7090]">{label}</p>
                <p className="pacers-display mt-1 text-2xl text-[var(--brand-secondary)]">{statValue(value)}</p>
              </div>
            ))}
          </div>

          {!hasStatLine(stats || {}) && (
            <p className="mt-3 border border-[var(--brand-secondary)]/20 bg-[var(--brand-secondary)]/8 p-3 text-sm font-bold text-[#ffe8a0]">No current minutes logged this season.</p>
          )}

          {/* Bio */}
          <div className="mt-5 grid gap-3 border border-white/6 bg-white/4 p-4 text-sm backdrop-blur-md">
            {[
              ['Height / Weight', `${player.bio?.displayHeight || player.height} / ${player.bio?.displayWeight || `${player.weight} lbs`}`],
              ['Age', player.age],
              ['College', player.bio?.college || '—'],
              ['From', player.bio?.birthPlace || '—'],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="font-bold text-[#5a7090]">{label}</span>
                <strong className="text-right text-white">{val}</strong>
              </div>
            ))}
          </div>

          {/* Recent team rhythm */}
          <div className="mt-5">
            <p className="pacers-display-flat text-[11px] tracking-[0.2em] text-[var(--brand-secondary)]/60">RECENT TEAM RHYTHM</p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {recentGames?.map((game) => (
                <div key={`${player.id}-${game.id}`} className="min-w-28 border border-white/6 bg-white/4 p-3 backdrop-blur-md">
                  <p className="text-xs font-bold text-[#5a7090]">vs {game.opponent}</p>
                  <p className={`mt-1 text-lg font-black ${game.result === 'W' ? 'text-emerald-300' : 'text-rose-300'}`}>{game.result}</p>
                  <p className="tabular-nums text-xs text-[#5a7090]">{game.score}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mt-5">
            <p className="pacers-display-flat text-[11px] tracking-[0.2em] text-[var(--brand-secondary)]/60">RELATED LINKS</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {links.map((link) => (
                <a key={`${player.id}-${link.href}`} href={link.href} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-between gap-2 border border-white/6 bg-white/4 px-3 text-sm font-bold text-white backdrop-blur-md transition hover:border-[var(--brand-secondary)]/40 hover:bg-[var(--brand-secondary)]/8 hover:text-[var(--brand-secondary)]">
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5 opacity-40" />
                </a>
              ))}
              {socialLinks.map((link) => (
                <a key={`${player.id}-${link.href}`} href={link.href} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-between gap-2 border border-white/6 bg-white/4 px-3 text-sm font-bold text-white backdrop-blur-md transition hover:border-[var(--brand-secondary)]/40 hover:bg-[var(--brand-secondary)]/8 hover:text-[var(--brand-secondary)]">
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5 opacity-40" />
                </a>
              ))}
              {!links.length && !socialLinks.length && (
                <p className="col-span-2 border border-white/6 bg-white/4 p-3 text-sm font-bold text-[#5a7090]">No related player links available.</p>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
