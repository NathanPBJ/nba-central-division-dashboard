import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LogoEvolution({ logos, teamName }) {
  const [activeIndex, setActiveIndex] = useState(logos.length - 1)
  const activeLogo = logos[activeIndex]

  if (!logos || logos.length === 0) return null

  return (
    <div className="border border-white/6 bg-[var(--brand-primary)]/60 p-5 lg:p-6 mt-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="pacers-display-flat text-[11px] tracking-[0.2em] text-[var(--brand-secondary)] uppercase">Logo Evolution</p>
          <p className="text-sm text-[#5a7090] mt-1">{teamName} visual history</p>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        {/* Logo Display */}
        <div className="relative h-48 w-full max-w-[200px] mb-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeLogo.year}
              src={activeLogo.imgUrl}
              alt={`${teamName} ${activeLogo.year} logo`}
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute max-h-full max-w-full object-contain drop-shadow-[0_0_15px_var(--brand-secondary)]"
            />
          </AnimatePresence>
        </div>

        {/* Timeline selector */}
        <div className="w-full flex justify-between relative mt-4">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 z-0" />
          {logos.map((logo, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={logo.year}
                onClick={() => setActiveIndex(index)}
                className="relative z-10 flex flex-col items-center gap-2 group outline-none"
              >
                <div 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-[var(--brand-secondary)] shadow-[0_0_10px_var(--brand-secondary)] scale-125' 
                      : 'bg-[#5a7090] group-hover:bg-white/50'
                  }`}
                />
                <span className={`pacers-display-flat text-[10px] tracking-wider transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-[#5a7090] group-hover:text-white/70'
                }`}>
                  {logo.year}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
