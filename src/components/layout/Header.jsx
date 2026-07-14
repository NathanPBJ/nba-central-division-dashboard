import { NavLink, useParams, Link } from 'react-router-dom'
import { useQueryClient, useIsFetching } from '@tanstack/react-query'
import { RefreshCw, Home } from 'lucide-react'
import { tabs } from '../../constants/config'
import { teamQueryKey } from '../../api/queries'
import { Button } from '../ui/Button'
import { TEAM_THEMES, getTeamLogoUrl } from '../../constants/teamThemes'

export function Header({ teamProfile, teamSlug }) {
  const { teamSlug: slugFromParams } = useParams()
  const slug = teamSlug || slugFromParams
  const queryClient = useQueryClient()
  const queryKey = teamQueryKey(slug)
  const isFetching = useIsFetching({ queryKey }) > 0
  const teamTheme = TEAM_THEMES[slug] || TEAM_THEMES['ind']
  const logoUrl = getTeamLogoUrl(slug)

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey })
  }

  // Per-team display font for the team name H1
  const displayFont =
    slug === 'chi' ? "'Bebas Neue', sans-serif" :
    slug === 'det' ? "'Oswald', sans-serif" :
    slug === 'cle' ? "'Playfair Display', serif" :
    slug === 'mil' ? "'DM Sans', sans-serif" :
    "'Outfit', sans-serif"

  const nameStyle =
    slug === 'chi' ? { letterSpacing: '0.06em',  lineHeight: '0.9' } :
    slug === 'det' ? { letterSpacing: '0.04em',  lineHeight: '0.9' } :
    slug === 'cle' ? { letterSpacing: '-0.01em', lineHeight: '1.0' } :
    slug === 'mil' ? { letterSpacing: '-0.02em', lineHeight: '1.0' } :
                     { letterSpacing: '-0.04em', lineHeight: '0.95', fontStyle: 'italic' }

  const subLabel =
    slug === 'chi' ? 'THE UNITED CENTER' :
    slug === 'mil' ? 'FISERV FORUM' :
    slug === 'cle' ? 'ROCKET MORTGAGE FIELDHOUSE' :
    slug === 'det' ? 'LITTLE CAESARS ARENA' :
    'GAINBRIDGE FIELDHOUSE'

  return (
    <header
      className="speed-lines sticky top-0 z-20 border-b border-white/10 shadow-2xl shadow-black/30 backdrop-blur-3xl"
      style={{ background: `color-mix(in srgb, var(--brand-bg) 80%, transparent)` }}
    >
      <div className="bg-noise absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-6">
        {/* Accent top-line — team-color gradient */}
        <div
          className="header-accent-line absolute inset-x-0 top-0 h-[2px] opacity-70"
          style={{
            background: `linear-gradient(90deg, transparent, var(--brand-secondary), transparent)`,
          }}
        />

        <div className="flex flex-col gap-3 py-3">
          {/* Top row: identity + controls */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* ── Left: Logo + Team Name ── */}
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                {/* ESPN CDN logo for every team */}
                <img
                  src={logoUrl}
                  alt={teamProfile.name}
                  width={64}
                  height={64}
                  className="relative z-10 h-16 w-16 object-contain"
                  style={{
                    filter: `drop-shadow(0 0 14px ${teamTheme.glowColor})`,
                  }}
                  onError={(e) => {
                    // Fallback: show styled text badge if CDN fails
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextSibling.style.display = 'flex'
                  }}
                />
                {/* Hidden fallback badge */}
                <div
                  className="team-logo-badge"
                  style={{ display: 'none', position: 'absolute', inset: 0 }}
                  aria-hidden="true"
                >
                  {teamTheme.abbr}
                </div>
              </div>

              <div>
                <p
                  className="text-[10px] font-bold tracking-[0.3em] uppercase"
                  style={{ color: 'var(--brand-secondary)', opacity: 0.6 }}
                >
                  {subLabel}
                </p>
                <h1
                  className="text-4xl font-black text-white sm:text-5xl"
                  style={{ fontFamily: displayFont, ...nameStyle }}
                >
                  {teamProfile.name}
                </h1>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  {teamProfile.standingSummary || teamProfile.division}
                </p>
              </div>
            </div>

            {/* ── Right: Stats + Controls ── */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Home link */}
              <Link
                to="/"
                id="header-home-link"
                aria-label="Back to all teams"
                title="All Teams"
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-white/8 bg-white/4 text-white/40 transition hover:border-white/20 hover:text-white"
              >
                <Home className="h-4 w-4" />
              </Link>

              {/* Live stat chips */}
              {[
                { label: 'Record', val: teamProfile.record },
                { label: 'PPG',    val: Number(teamProfile.offensiveRating || 0).toFixed(1) },
                { label: 'Diff',   val: `${Number(teamProfile.netRating || 0) > 0 ? '+' : ''}${Number(teamProfile.netRating || 0).toFixed(1)}` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="racing-stripe min-w-[5.5rem] border border-white/6 bg-white/3 px-4 py-2"
                  style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{item.label}</p>
                  <p
                    className="text-xl font-black tabular-nums"
                    style={{ color: 'var(--brand-secondary)', fontFamily: displayFont }}
                  >
                    {item.val}
                  </p>
                </div>
              ))}

              {/* Refresh */}
              <Button
                intent="ghost"
                shape="skewed"
                onClick={handleRefresh}
                disabled={isFetching}
                id="header-refresh-btn"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin' : ''}`} />
                {isFetching ? 'Syncing' : 'Live'}
              </Button>
            </div>
          </div>

          {/* ── Nav tabs ── */}
          <nav className="no-scrollbar -mb-3 flex gap-1 overflow-x-auto" aria-label="Dashboard sections">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  end={tab.path === '.'}
                  className={({ isActive }) =>
                    `nav-tab flex min-h-10 shrink-0 items-center gap-2 px-4 text-sm font-bold uppercase tracking-wider transition ${
                      isActive
                        ? 'nav-tab-active text-[var(--brand-secondary)]'
                        : 'text-neutral-400 hover:text-white'
                    }`
                  }
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
