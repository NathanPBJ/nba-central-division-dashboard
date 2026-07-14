import { NavLink } from 'react-router-dom'
import { useQueryClient, useIsFetching } from '@tanstack/react-query'
import { RefreshCw } from 'lucide-react'
import { tabs } from '../../constants/config'
import { pacersQueryKey } from '../../api/queries'
import { Button } from '../ui/Button'
import { useDashboardStore } from '../../store/useDashboardStore'

export function Header({ teamProfile }) {
  const queryClient = useQueryClient()
  const isFetching = useIsFetching({ queryKey: pacersQueryKey }) > 0
  const { theme, setTheme } = useDashboardStore()

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: pacersQueryKey })
  }

  return (
    <header className="speed-lines sticky top-0 z-20 border-b border-white/10 bg-[var(--brand-bg)]/60 shadow-2xl shadow-black/30 backdrop-blur-3xl">
      <div className="bg-noise absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-6">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--brand-secondary)] to-transparent opacity-60" />

        <div className="flex flex-col gap-3 py-3">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src="/pacers-logo.svg" alt="Indiana Pacers" className="relative z-10 h-16 w-16 drop-shadow-[0_0_12px_rgba(253,187,48,0.3)]" />
              </div>
              <div>
                <p className="pacers-display-flat text-[10px] tracking-[0.3em] text-[var(--brand-secondary)]/70">COURT COMMAND</p>
                <h1 className="pacers-display text-4xl text-white sm:text-5xl">{teamProfile.name}</h1>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">{teamProfile.standingSummary || teamProfile.division}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Theme Switcher */}
              <div className="flex items-center gap-2 mr-2 bg-black/20 px-3 py-2 rounded-full border border-white/5">
                <button type="button" onClick={() => setTheme('modern-navy')} className={`w-4 h-4 rounded-full bg-[#002D62] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] transition-transform ${theme === 'modern-navy' ? 'ring-2 ring-[var(--brand-secondary)] ring-offset-2 ring-offset-transparent scale-110' : 'hover:scale-110'}`} aria-label="Modern Navy theme" title="Modern Navy" />
                <button type="button" onClick={() => setTheme('flo-jo')} className={`w-4 h-4 rounded-full bg-[#FFC633] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] transition-transform ${theme === 'flo-jo' ? 'ring-2 ring-[var(--brand-secondary)] ring-offset-2 ring-offset-transparent scale-110' : 'hover:scale-110'}`} aria-label="90s Flo-Jo theme" title="90s Flo-Jo" />
                <button type="button" onClick={() => setTheme('hickory')} className={`w-4 h-4 rounded-full bg-[#8A1538] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] transition-transform ${theme === 'hickory' ? 'ring-2 ring-[var(--brand-secondary)] ring-offset-2 ring-offset-transparent scale-110' : 'hover:scale-110'}`} aria-label="Hickory theme" title="Hickory" />
              </div>

              {[
                { label: 'Record', val: teamProfile.record },
                { label: 'PPG', val: Number(teamProfile.offensiveRating || 0).toFixed(1) },
                { label: 'Diff', val: `${Number(teamProfile.netRating || 0) > 0 ? '+' : ''}${Number(teamProfile.netRating || 0).toFixed(1)}` },
              ].map((item) => (
                <div key={item.label} className="racing-stripe min-w-[5.5rem] border border-white/6 bg-white/3 px-4 py-2" style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}>
                  <p className="pacers-display-flat text-[10px] tracking-[0.2em] text-white/50">{item.label}</p>
                  <p className="pacers-display-flat text-xl tabular-nums text-[var(--brand-secondary)]">{item.val}</p>
                </div>
              ))}
              
              <Button 
                intent="ghost" 
                shape="skewed" 
                onClick={handleRefresh}
                disabled={isFetching}
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin' : ''}`} />
                {isFetching ? 'Syncing' : 'Live'}
              </Button>
            </div>
          </div>

          <nav className="no-scrollbar -mb-3 flex gap-1 overflow-x-auto" aria-label="Dashboard sections">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  className={({ isActive }) => `nav-tab flex min-h-10 shrink-0 items-center gap-2 px-4 text-sm font-bold uppercase tracking-wider transition ${
                    isActive ? 'nav-tab-active text-[#fdbb30]' : 'text-[#5a7090] hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
