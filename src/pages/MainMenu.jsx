import { useState, useEffect, useRef, useCallback } from 'react'
import nbaPlayerIds from '../data/nbaPlayerIds.json'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import { TEAM_THEMES, TEAM_ORDER, getTeamLogoUrl } from '../constants/teamThemes'
import { useSound } from '../hooks/useSound'

/* ─── Per-team player rotation roster ────────────────────────
   Slot 0: Most iconic legend
   Slot 1: One more classic / historic player  
   Slot 2: Current most famous player on roster
   ─────────────────────────────────────────────────────────── */
const TEAM_PLAYERS = {
  chi: [
    { name: 'Michael Jordan', short: 'M. JORDAN', number: '23', pos: 'SG', label: 'THE GOAT',      imgUrl: '/players/michael-jordan.jpg' },
    { name: 'Scottie Pippen', short: 'S. PIPPEN', number: '33', pos: 'SF', label: 'POINT FORWARD', imgUrl: '/players/scottie-pippen.webp'  },
    { name: 'Josh Giddey',    short: 'J. GIDDEY', number: '3',  pos: 'PG', label: 'AUSSIE MAGIC',  imgUrl: '/players/josh-giddey.avif' },
  ],
  mil: [
    { name: 'Kareem Abdul-Jabbar',   short: 'KAREEM',     number: '33', pos: 'C',  label: 'THE CAPTAIN', imgUrl: '/players/kareem-abdul-jabbar.jpg' },
    { name: 'Giannis Antetokounmpo', short: 'GIANNIS',    number: '34', pos: 'PF', label: 'GREEK FREAK', imgUrl: '/players/giannis-antetokounmpo.jpg' },
    { name: 'Gary Trent Jr.',        short: 'G. TRENT',   number: '5',  pos: 'SG', label: 'SHARPSHOOTER',imgUrl: '/players/gary-trent-jr.webp' },
  ],
  ind: [
    { name: 'Reggie Miller',     short: 'R. MILLER',    number: '31', pos: 'SG', label: 'KNICK KILLER', imgUrl: '/players/reggie-miller.jpg' },
    { name: 'Paul George',       short: 'P. GEORGE',    number: '13', pos: 'SF', label: 'PLAYOFF P',    imgUrl: '/players/paul-george.jpg' },
    { name: 'Tyrese Haliburton', short: 'HALIBURTON',   number: '0',  pos: 'PG', label: 'POINT GOD',    imgUrl: '/players/tyrese-haliburton.jpeg' },
  ],
  cle: [
    { name: 'LeBron James',      short: 'LEBRON',      number: '23', pos: 'SF', label: 'THE KING',   imgUrl: '/players/lebron-james.jpg' },
    { name: 'Kyrie Irving',      short: 'KYRIE',       number: '2',  pos: 'PG', label: 'UNCLE DREW', imgUrl: '/players/kyrie-irving.jpg' },
    { name: 'Donovan Mitchell',  short: 'D. MITCHELL', number: '45', pos: 'SG', label: 'SPIDA',      imgUrl: '/players/donovan-mitchell.jpg' },
  ],
  det: [
    { name: 'Isiah Thomas',      short: 'I. THOMAS', number: '11', pos: 'PG', label: 'BAD BOY',   imgUrl: '/players/isaiah-thomas.jpg' },
    { name: 'Ben Wallace',       short: 'B. WALLACE',number: '3',  pos: 'C',  label: 'BIG BEN',   imgUrl: '/players/ben-wallace.jpg' },
    { name: 'Cade Cunningham',   short: 'CADE',      number: '2',  pos: 'PG', label: 'MOTORCADE', imgUrl: '/players/cade-cunningham.webp' },
  ],
}

/* ─── Display font per team ───────────────────────────────── */
function teamFont(slug) {
  if (slug === 'chi') return "'Bebas Neue', sans-serif"
  if (slug === 'det') return "'Oswald', sans-serif"
  if (slug === 'cle') return "'Playfair Display', serif"
  if (slug === 'mil') return "'DM Sans', sans-serif"
  return "'Outfit', sans-serif"
}

/* ─── Individual card ─────────────────────────────────────── */
function TeamCard({ slug, theme, player, position, isActive, onClick }) {
  const abs = Math.abs(position)
  const { cardGradient, glowColor, cardTextAccent, name } = theme

  const parts       = name.split(' ')
  const nickname    = parts.slice(-1)[0]           // "Bulls"
  const city        = parts.slice(0, -1).join(' ') // "Chicago"
  const font        = teamFont(slug)

  // coverflow geometry
  const xOff    = position * 268
  const rotY    = position * -42
  const zOff    = abs === 0 ? 0 : abs === 1 ? -90 : -180
  const scale   = abs === 0 ? 1 : abs === 1 ? 0.78 : 0.60
  const opac    = abs === 0 ? 1 : abs === 1 ? 0.8 : 0.45

  return (
    <motion.div
      className="absolute select-none"
      style={{
        width: 260, // Slightly wider to match mockup proportions
        height: 400,
        top: '50%',
        left: '50%',
        marginLeft: -130,
        marginTop: -200,
        zIndex: abs === 0 ? 20 : 10 - abs,
        cursor: isActive ? 'default' : 'pointer',
        transformOrigin: 'center center',
      }}
      animate={{ x: xOff, rotateY: rotY, z: zOff, scale, opacity: opac }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={() => !isActive && onClick()}
      role={isActive ? 'presentation' : 'button'}
      tabIndex={isActive ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isActive) onClick()
      }}
      aria-label={isActive ? undefined : `Select ${name}`}
    >
      {/* ── Inner Card Shell (Gradient & Effects, Overflow Hidden) ── */}
      <div
        className="absolute inset-0 rounded-[14px] overflow-hidden"
        style={{
          background: `linear-gradient(175deg, ${cardGradient[0]} 0%, ${cardGradient[1]} 60%, ${cardGradient[2]} 100%)`,
          boxShadow: `inset 0 0 40px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Bottom gradient scrim inside shell */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{
            height: '50%',
            background: `linear-gradient(to top, ${cardGradient[2]} 0%, ${cardGradient[2]}e6 35%, transparent 100%)`,
          }}
        />
      </div>

      {/* ── Glowing Neon Border (Overlays the shell) ── */}
      <div
        className="absolute inset-[1px] rounded-[14px] pointer-events-none z-20"
        style={{
          border: isActive ? `4px solid ${cardTextAccent}` : `2px solid ${cardTextAccent}60`,
          boxShadow: isActive 
            ? `0 0 25px ${glowColor}, 0 0 50px ${glowColor}, inset 0 0 20px ${glowColor}`
            : `0 0 10px ${glowColor}80, inset 0 0 5px ${glowColor}50`,
        }}
      />

      {/* ── Player Photo Overlay ── */}
      <div className="absolute inset-0 z-30 pointer-events-none rounded-[14px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${slug}-${player.name}`}
            src={player.imgUrl}
            alt={player.name}
            className="absolute inset-0 w-full h-full object-cover object-[center_top]"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
        
        {/* Subtle gradient overlay to ensure text legibility over any photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
      </div>

      {/* ── Text Overlay Container (Z-index 40, sits on top of everything) ── */}
      <div className="absolute inset-0 rounded-[14px] z-40 pointer-events-none flex flex-col justify-between overflow-hidden">
        
        {/* Top-left: just logo */}
        <div className="flex flex-col items-start p-5 pb-0">
          <img
            src={getTeamLogoUrl(slug)}
            alt={name}
            style={{ width: 64, height: 64 }}
            className="object-contain drop-shadow-2xl"
            onError={(e) => { e.currentTarget.style.opacity = '0' }}
          />
        </div>

        {/* Bottom: player info strip */}
        <div className="p-5 pt-3">
          {/* Glowing separator */}
          <div className="w-full h-[2px] mb-3 opacity-60 drop-shadow-md" style={{ background: `linear-gradient(90deg, ${cardTextAccent}, transparent)` }} />
          
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1.5 text-white/90 drop-shadow-md">
            Central Division
          </p>
          <div className="flex items-end justify-between w-full gap-1">
            <p className="text-[20px] font-black text-white leading-none tracking-wide drop-shadow-lg truncate" style={{ fontFamily: font }}>
              {player.short}
            </p>
            <div className="text-right shrink-0 drop-shadow-lg flex items-baseline">
              <span className="text-[22px] font-black leading-none" style={{ color: cardTextAccent, fontFamily: font }}>
                #{player.number}
              </span>
              <span className="ml-1 text-[12px] font-semibold text-white/90">| {player.pos}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Menu ─────────────────────────────────────────────── */
export function MainMenu() {
  const [activeIndex, setActiveIndex]     = useState(2)
  const [playerMap, setPlayerMap]         = useState({ chi: 0, mil: 0, ind: 0, cle: 0, det: 0 })
  const intervalRef                        = useRef(null)
  const { playSwoosh }                     = useSound()

  const teams = TEAM_ORDER.map((slug) => ({
    slug,
    theme:   TEAM_THEMES[slug],
    players: TEAM_PLAYERS[slug],
  }))

  const activeTeam      = teams[activeIndex]
  const activeSlug      = activeTeam.slug
  const activeTheme     = activeTeam.theme
  const activePlayerIdx = playerMap[activeSlug]
  const activePlayer    = activeTeam.players[activePlayerIdx]

  // Rotate player spotlight every 4 s (only on the active team)
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setPlayerMap((prev) => ({
        ...prev,
        [activeSlug]: (prev[activeSlug] + 1) % 3,
      }))
    }, 4000)
    return () => clearInterval(intervalRef.current)
  }, [activeSlug])

  const goNext = useCallback(() => {
    setActiveIndex((i) => {
      if (i < teams.length - 1) playSwoosh()
      return Math.min(i + 1, teams.length - 1)
    })
  }, [teams.length, playSwoosh])

  const goPrev = useCallback(() => {
    setActiveIndex((i) => {
      if (i > 0) playSwoosh()
      return Math.max(i - 1, 0)
    })
  }, [playSwoosh])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft')  goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#06060a', position: 'relative' }}
    >
      {/* ══════ ARENA BACKGROUND ══════ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Ceiling spotlights */}
        <div style={{
          position: 'absolute', top: -80, left: '18%', width: 320, height: 480,
          background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.07) 0%, transparent 65%)',
          transform: 'rotate(-10deg)',
        }} />
        <div style={{
          position: 'absolute', top: -80, right: '18%', width: 320, height: 480,
          background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.06) 0%, transparent 65%)',
          transform: 'rotate(10deg)',
        }} />
        <div style={{
          position: 'absolute', top: -60, left: '48%', width: 200, height: 380,
          background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, transparent 60%)',
        }} />
        {/* Subtle court floor sheen at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to top, rgba(255,255,255,0.018) 0%, transparent 100%)',
        }} />
        {/* Mockup Tech Particles */}
        <div className="absolute top-[30%] left-[10%] w-12 h-[2px] bg-red-500/80 shadow-[0_0_10px_red] -rotate-12 rounded-full" />
        <div className="absolute top-[25%] right-[15%] w-16 h-[2px] bg-green-400/80 shadow-[0_0_10px_#4ade80] rotate-6 rounded-full" />
        <div className="absolute bottom-[20%] left-[5%] w-8 h-[2px] bg-red-500/60 shadow-[0_0_10px_red] -rotate-6 rounded-full" />
        <div className="absolute top-[40%] right-[8%] w-6 h-[2px] bg-green-400/60 shadow-[0_0_10px_#4ade80] rounded-full" />
        <div className="absolute bottom-[35%] right-[10%] w-10 h-[2px] bg-red-500/80 shadow-[0_0_10px_red] rotate-12 rounded-full" />
        
        {/* Team ambient glow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlug}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{
              background: `radial-gradient(ellipse at 50% 80%, ${activeTheme.glowColor} 0%, transparent 52%)`,
            }}
          />
        </AnimatePresence>
      </div>

      {/* ══════ TOP NAVIGATION ══════ */}
      <div className="relative z-30 flex items-center justify-between px-6 pt-6 pb-2">
        {/* Left: NBA Logo */}
        <div className="flex items-center">
          <img 
            src="https://cdn.nba.com/logos/leagues/logo-nba.svg" 
            alt="NBA Logo" 
            className="h-14 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          />
        </div>
        
        {/* Center: Top Text */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-[11px] font-medium tracking-[0.2em] text-white/70 uppercase">
            <span className="font-bold text-white">NBA TEAM SELECTION</span> <span className="text-white/30 mx-1">|</span> CENTRAL DIVISION
          </p>
        </div>

        {/* Right: Empty placeholder for symmetry */}
        <div className="flex items-center w-14" />
      </div>

      {/* ══════ TITLE ══════ */}
      <div className="relative z-20 flex-none pt-4 pb-2 text-center px-4">
        <h1
          className="font-black uppercase italic"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '0.05em',
            color: 'transparent',
            WebkitTextStroke: `2px ${activeTheme.auraColor}`,
            textShadow: `0 0 15px ${activeTheme.auraColor}66, 0 0 40px ${activeTheme.auraColor}4D`,
            transition: 'all 0.5s ease',
          }}
        >
          Select Your Franchise
        </h1>
      </div>

      {/* ══════ CAROUSEL ══════ */}
      <div
        className="relative flex-1 flex items-center justify-center"
        style={{
          perspective: 1100,
          perspectiveOrigin: '50% 48%',
          minHeight: 0, // flex-1 needs this to actually shrink
        }}
      >
        {/* ─── Glowing Cyan Cylinder Stage ─── */}
        <div 
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            width: '120vw',
            height: '420px',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        >
          {/* Top Ring */}
          <div className="absolute top-0 left-0 w-full h-[150px] border-[3px] rounded-[100%] transition-colors duration-500" style={{ borderColor: `${activeTheme.auraColor}99`, opacity: 0.8, boxShadow: `0 0 20px ${activeTheme.auraColor}99, inset 0 0 20px ${activeTheme.auraColor}99` }} />
          {/* Bottom Ring */}
          <div className="absolute bottom-[-80px] left-0 w-full h-[200px] border-[4px] rounded-[100%] transition-colors duration-500" style={{ borderColor: `${activeTheme.auraColor}cc`, opacity: 0.9, boxShadow: `0 0 30px ${activeTheme.auraColor}99, inset 0 0 30px ${activeTheme.auraColor}99` }} />
          {/* Faint connecting sides */}
          <div className="absolute top-[75px] bottom-[20px] left-0 w-full border-l-[2px] border-r-[2px] transition-colors duration-500" style={{ borderColor: `${activeTheme.auraColor}33`, boxShadow: `0 0 15px ${activeTheme.auraColor}80` }} />
        </div>

        {/* ─── Left arrow ─── */}
        <button
          onClick={goPrev}
          disabled={activeIndex === 0}
          id="carousel-prev"
          aria-label="Previous team"
          className="absolute left-3 sm:left-8 z-40 h-11 w-11 flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-15 disabled:cursor-not-allowed hover:scale-110 hover:bg-white/10"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.14)',
            color: '#fff',
            backdropFilter: 'blur(8px)',
          }}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* ─── Cards ─── */}
        <div
          className="relative w-full z-30"
          style={{ transformStyle: 'preserve-3d', height: 420 }}
        >
          {teams.map(({ slug, theme, players }, i) => {
            const pos = i - activeIndex
            if (Math.abs(pos) > 2) return null
            return (
              <TeamCard
                key={slug}
                slug={slug}
                theme={theme}
                player={players[playerMap[slug]]}
                position={pos}
                isActive={i === activeIndex}
                onClick={() => {
                  if (i !== activeIndex) playSwoosh()
                  setActiveIndex(i)
                }}
              />
            )
          })}
        </div>

        {/* ─── Right arrow ─── */}
        <button
          onClick={goNext}
          disabled={activeIndex === teams.length - 1}
          id="carousel-next"
          aria-label="Next team"
          className="absolute right-3 sm:right-8 z-30 h-11 w-11 flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-15 disabled:cursor-not-allowed hover:scale-110 hover:bg-white/10"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.14)',
            color: '#fff',
            backdropFilter: 'blur(8px)',
          }}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* ══════ BOTTOM SECTION ══════ */}
      <div className="relative z-20 flex-none pb-6 px-4 space-y-3">
        {/* Team name + player pip indicators */}
        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlug + '-nameblock'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <p
                className="text-xl font-black text-white uppercase tracking-widest leading-none"
                style={{ fontFamily: teamFont(activeSlug) }}
              >
                {activeTheme.name}
              </p>
              <p
                className="text-[11px] mt-0.5 font-bold uppercase tracking-[0.18em]"
                style={{ color: activeTheme.cardTextAccent, opacity: 0.7 }}
              >
                {activePlayer.label} · {activePlayer.short} #{activePlayer.number} | {activePlayer.pos}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Player slot pips */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {activeTeam.players.map((p, i) => (
              <button
                key={p.imgId}
                onClick={() => setPlayerMap((prev) => ({ ...prev, [activeSlug]: i }))}
                aria-label={`View ${p.name}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activePlayerIdx ? 18 : 6,
                  height: 6,
                  background:
                    i === activePlayerIdx
                      ? activeTheme.cardTextAccent
                      : 'rgba(255,255,255,0.22)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Team dot indicators */}
        <div className="flex items-center justify-center gap-3">
          {teams.map(({ slug, theme }, i) => (
            <button
              key={slug}
              onClick={() => {
                if (i !== activeIndex) playSwoosh()
                setActiveIndex(i)
              }}
              id={`team-dot-${slug}`}
              aria-label={`Select ${theme.name}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === activeIndex ? 24 : 8,
                height: 8,
                background:
                  i === activeIndex
                    ? activeTheme.cardTextAccent
                    : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex items-center justify-center pt-2">
          <Link
            to={`/${activeSlug}`}
            id="confirm-selection-btn"
            className="group relative inline-flex items-center justify-center rounded-full px-12 py-3.5 transition-all duration-300 overflow-hidden"
            style={{
              color: '#fff',
              border: `2px solid ${activeTheme.cardAccent}`,
              boxShadow: `0 0 20px ${activeTheme.glowColor}60, inset 0 0 15px ${activeTheme.glowColor}50`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = `0 0 30px ${activeTheme.glowColor}80, inset 0 0 25px ${activeTheme.glowColor}70`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = `0 0 20px ${activeTheme.glowColor}60, inset 0 0 15px ${activeTheme.glowColor}50`
            }}
          >
            {/* Inner background glow (makes it semi-solid like mockup) */}
            <div 
              className="absolute inset-0 z-0 transition-opacity duration-300" 
              style={{ background: activeTheme.cardAccent, opacity: 0.85 }} 
            />
            <span 
              className="relative z-10 font-black tracking-[0.08em] text-white drop-shadow-md uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', letterSpacing: '0.1em', transform: 'translateY(2px)' }}
            >
              Confirm Selection
            </span>
          </Link>
        </div>

        <div className="flex justify-between items-center px-4 pt-4 opacity-30">
          <div className="flex flex-col gap-1 w-32">
            <div className="h-[1px] w-full bg-white" />
            <div className="h-[1px] w-2/3 bg-white" />
          </div>
          <p className="text-[9px] tracking-[0.3em] uppercase text-white font-mono">
            // STATUS: OPERATIONAL
          </p>
          <div className="flex gap-2">
            <div className="w-8 h-2 bg-white/50" />
            <div className="w-4 h-2 bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  )
}
