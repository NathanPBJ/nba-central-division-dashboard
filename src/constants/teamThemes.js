/**
 * Central source of truth for team visual identities.
 * Used by: MainMenu carousel, Header dynamic branding, CSS variable system.
 */

/**
 * Returns the ESPN CDN logo URL for a given team slug.
 * e.g. getTeamLogoUrl('chi') → 'https://a.espncdn.com/i/teamlogos/nba/500/chi.png'
 */
export function getTeamLogoUrl(slug) {
  return `https://a.espncdn.com/i/teamlogos/nba/500/${slug}.png`
}

export const TEAM_THEMES = {
  chi: {
    slug: 'chi',
    name: 'Chicago Bulls',
    abbr: 'CHI',
    tagline: 'Six Time Champions',
    founded: '1966',
    arena: 'United Center',
    conference: 'Eastern',
    division: 'Central',
    // Card gradient colors for the carousel
    cardGradient: ['#1a0005', '#3d0010', '#C9082A'],
    cardAccent: '#C9082A',
    cardTextAccent: '#FF4466',
    glowColor: 'rgba(201,8,42,0.6)',
    auraColor: '#ff2a54', // Neon Red/Pink
    // CSS variable values (mirrors [data-team="chi"] in index.css)
    primary: '#C9082A',
    secondary: '#FF4466',
    bg: '#0D0005',
    surface: '#1a0008',
    // Font class to apply to display text in the carousel card
    fontClass: 'font-chi',
    logoLabel: 'BULLS',
    // Overview page hero text
    headline: 'The Dynasty\nNever Dies',
    // Radar chart team data key
    radarKey: 'Bulls',
    logoEvolution: [
      { year: '1966-Present', imgUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/chi.png' }
    ]
  },
  mil: {
    slug: 'mil',
    name: 'Milwaukee Bucks',
    abbr: 'MIL',
    tagline: 'Bucks in Six',
    founded: '1968',
    arena: 'Fiserv Forum',
    conference: 'Eastern',
    division: 'Central',
    cardGradient: ['#011a07', '#003a12', '#00471B'],
    cardAccent: '#00471B',
    cardTextAccent: '#EEE1C6',
    glowColor: 'rgba(0,71,27,0.6)',
    auraColor: '#34d399', // Neon Emerald
    primary: '#00471B',
    secondary: '#EEE1C6',
    bg: '#050f07',
    surface: '#0a1f0e',
    fontClass: 'font-mil',
    logoLabel: 'BUCKS',
    headline: 'Fear\nthe Deer',
    radarKey: 'Bucks',
    logoEvolution: [
      { year: '1968-1993', imgUrl: '/logos/mil-1968-1993.gif' },
      { year: '1993-2006', imgUrl: '/logos/mil-1993-2006.gif' },
      { year: '2006-2015', imgUrl: '/logos/mil-2006-2015.gif' },
      { year: '2015-Present', imgUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/mil.png' }
    ]
  },
  ind: {
    slug: 'ind',
    name: 'Indiana Pacers',
    abbr: 'IND',
    tagline: 'Indy Never Stops',
    founded: '1967',
    arena: 'Gainbridge Fieldhouse',
    conference: 'Eastern',
    division: 'Central',
    cardGradient: ['#010a18', '#001840', '#002D62'],
    cardAccent: '#FDBB30',
    cardTextAccent: '#FDBB30',
    glowColor: 'rgba(253,187,48,0.45)',
    auraColor: '#FDBB30', // Pacers Gold
    primary: '#002D62',
    secondary: '#FDBB30',
    bg: '#010a18',
    surface: '#081428',
    fontClass: 'font-ind',
    logoLabel: 'PACERS',
    headline: 'Gold Runs\nThrough Indy',
    radarKey: 'Pacers',
    logoEvolution: [
      { year: '1967-1976', imgUrl: '/logos/ind-1967-1976.gif' },
      { year: '1976-1990', imgUrl: '/logos/ind-1976-1990.gif' },
      { year: '1990-2005', imgUrl: '/logos/ind-1990-2005.png' },
      { year: '2005-2017', imgUrl: '/logos/ind-2005-2017.png' },
      { year: '2018-2025', imgUrl: '/logos/ind-2018-2025.png' },
      { year: '2026-Present', imgUrl: '/logos/ind-2026-pres.png' }
    ]
  },
  cle: {
    slug: 'cle',
    name: 'Cleveland Cavaliers',
    abbr: 'CLE',
    tagline: 'The 3-1 Comeback',
    founded: '1970',
    arena: 'Rocket Mortgage FieldHouse',
    conference: 'Eastern',
    division: 'Central',
    cardGradient: ['#0f0508', '#3a0f1c', '#6F263D'],
    cardAccent: '#6F263D',
    cardTextAccent: '#FFB81C',
    glowColor: 'rgba(255,184,28,0.4)',
    auraColor: '#e11d48', // Neon Wine/Crimson (distinct from Gold)
    primary: '#6F263D',
    secondary: '#FFB81C',
    bg: '#0f0508',
    surface: '#1e0a12',
    fontClass: 'font-cle',
    logoLabel: 'CAVS',
    headline: 'Built in\nthe Land',
    radarKey: 'Cavaliers',
    logoEvolution: [
      { year: '1970-1983', imgUrl: '/logos/cle-1970-1983.gif' },
      { year: '1983-1994', imgUrl: '/logos/cle-1983-1994.gif' },
      { year: '1994-2003', imgUrl: '/logos/cle-1994-2003.gif' },
      { year: '2003-2010', imgUrl: '/logos/cle-2003-2010.gif' },
      { year: '2011-2017', imgUrl: '/logos/cle-2011-2017.gif' },
      { year: '2018-2022', imgUrl: '/logos/cle-2018-2022.gif' },
      { year: '2023-Present', imgUrl: '/logos/cle-2023-pres.gif' }
    ]
  },
  det: {
    slug: 'det',
    name: 'Detroit Pistons',
    abbr: 'DET',
    tagline: 'Bad Boys Forever',
    founded: '1941',
    arena: 'Little Caesars Arena',
    conference: 'Eastern',
    division: 'Central',
    cardGradient: ['#080c12', '#0a1530', '#1D42BA'],
    cardAccent: '#C8102E',
    cardTextAccent: '#8A9BA8',
    glowColor: 'rgba(29,66,186,0.55)',
    auraColor: '#3b82f6', // Neon Blue
    primary: '#1D42BA',
    secondary: '#C8102E',
    bg: '#080c12',
    surface: '#0d1522',
    fontClass: 'font-det',
    logoLabel: 'PISTONS',
    headline: 'Motor City\nMuscle',
    radarKey: 'Pistons',
    logoEvolution: [
      { year: '1957-1968', imgUrl: '/logos/det-1957-1968.gif' },
      { year: '1969-1975', imgUrl: '/logos/det-1969-1975.gif' },
      { year: '1976-1978', imgUrl: '/logos/det-1976-1978.gif' },
      { year: '1978-1996', imgUrl: '/logos/det-1978-1996.gif' },
      { year: '1996-2001', imgUrl: '/logos/det-1996-2001.gif' },
      { year: '2002-2005', imgUrl: '/logos/det-2002-2005.gif' },
      { year: '2005-2017', imgUrl: '/logos/det-2005-2017.gif' },
      { year: '2018-Present', imgUrl: '/logos/det-2018-pres.gif' }
    ]
  },
}

export const TEAM_ORDER = ['chi', 'mil', 'ind', 'cle', 'det']
