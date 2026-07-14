import { Header } from './Header'
import { PlayerDrawer } from './PlayerDrawer'

export function Layout({ data, children }) {
  const { teamProfile, roster, playerStats, recentGames } = data

  return (
    <div className="court-lines min-h-screen">
      <Header teamProfile={teamProfile} />
      
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:px-6">
        {children}
      </main>

      <PlayerDrawer
        roster={roster}
        playerStats={playerStats}
        recentGames={recentGames}
      />
    </div>
  )
}
