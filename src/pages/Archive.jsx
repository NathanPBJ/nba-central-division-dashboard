import { useOutletContext } from 'react-router-dom'
import { SectionHeader } from '../components/ui/SectionHeader'
import { StatPill } from '../components/ui/StatPill'

export function Archive() {
  const { data } = useOutletContext()
  const { achievements, milestones, teamProfile } = data

  return (
    <div className="grid gap-6">
      <section className="speed-lines relative overflow-hidden border border-[var(--brand-secondary)]/10 bg-gradient-to-br from-[var(--brand-primary)] via-[var(--brand-bg)] to-[var(--brand-primary)]">
        <div className="absolute -right-8 top-0 h-full w-32 bg-[var(--brand-secondary)]/5" style={{ transform: 'skewX(-12deg)' }} />
        <div className="relative z-10 grid gap-8 p-6 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
          <div>
            <p className="pacers-display-flat text-sm tracking-[0.3em] text-[var(--brand-secondary)]/50">FRANCHISE ARCHIVE</p>
            <h2 className="pacers-display gold-shimmer mt-4 text-6xl sm:text-8xl">Indiana<br />Pacers</h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <StatPill label="FOUNDED" value={teamProfile.founded} accent />
              <StatPill label="HOME COURT" value={teamProfile.arena} />
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-base leading-8 text-[#8a9bb5]">{teamProfile.identity}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="border border-white/6 bg-[var(--brand-primary)]/60 p-5 lg:p-6">
          <SectionHeader kicker="Achievements" title="Franchise Hardware" />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {achievements.map((item) => (
              <div key={item.label} className="racing-stripe relative overflow-hidden border border-white/6 bg-white/[0.02] p-4">
                <p className="pacers-display-flat text-[11px] tracking-[0.18em] text-[#5a7090]">{item.label}</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <p className="pacers-display text-5xl text-[var(--brand-secondary)]">{item.value}</p>
                  {!!item.badges?.length && (
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {item.badges.map((badge) => (
                        <span key={`${item.label}-${badge.label}`} className="pacers-display-flat bg-[var(--brand-secondary)]/10 px-2 py-1 text-[11px] text-[var(--brand-secondary)]">
                          {badge.label} {badge.value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {item.detail && <p className="mt-2 text-sm leading-5 text-[#5a7090]">{item.detail}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="border border-white/6 bg-[var(--brand-primary)]/60 p-5 lg:p-6">
          <SectionHeader kicker="Timeline" title="Defining Chapters" />
          <div className="relative grid gap-3">
            <div className="absolute bottom-0 left-[3.25rem] top-0 hidden w-px bg-gradient-to-b from-[var(--brand-secondary)]/30 via-[var(--brand-secondary)]/10 to-transparent sm:block" />

            {milestones.map((item, index) => (
              <article
                key={`${item.year}-${item.title}`}
                className="animate-slide-in relative border border-white/4 bg-white/[0.02] p-4 transition hover:border-[var(--brand-secondary)]/15"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <div className="pacers-display relative z-10 min-w-24 bg-[var(--brand-secondary)] px-4 py-3 text-center text-xl text-[var(--brand-primary)]" style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}>
                    {item.year}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#7a8ea6]">{item.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
