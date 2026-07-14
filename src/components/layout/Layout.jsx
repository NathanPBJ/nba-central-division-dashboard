import { useParams } from 'react-router-dom'
import { Header } from './Header'
import { PlayerDrawer } from './PlayerDrawer'

export function Layout({ data, children }) {
  const { teamSlug } = useParams()
  const { teamProfile, roster, playerStats, recentGames } = data

  return (
    <div
      className="min-h-screen"
      data-team={teamSlug}
      style={{ background: 'var(--brand-bg)', transition: 'background 0.4s ease' }}
    >
      {/* Per-team background texture layer */}
      {teamSlug === 'chi' && (
        <>
          <div className="chi-particles" aria-hidden="true" />
          {/* Repeating diagonal grid */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(201,8,42,0.03) 60px, rgba(201,8,42,0.03) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(201,8,42,0.03) 60px, rgba(201,8,42,0.03) 61px)',
              zIndex: 0,
            }}
            aria-hidden="true"
          />
        </>
      )}
      {teamSlug === 'mil' && (
        <div
          className="mil-chevrons fixed inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        />
      )}
      {teamSlug === 'ind' && (
        <div
          className="court-lines fixed inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        />
      )}
      {teamSlug === 'cle' && (
        <div
          className="cle-metal-texture fixed inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        />
      )}
      {teamSlug === 'det' && (
        <div
          className="det-grit fixed inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10">
        <Header teamProfile={teamProfile} teamSlug={teamSlug} />

        <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:px-6">
          {children}
        </main>

        <PlayerDrawer
          roster={roster}
          playerStats={playerStats}
          recentGames={recentGames}
        />
      </div>
    </div>
  )
}
