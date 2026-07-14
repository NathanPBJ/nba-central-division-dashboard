import fs from 'fs'
import path from 'path'

const teams = {
  chi: { primary: '#C9082A', secondary: '#FF4466', name: 'BULLS', eras: ['1966-Present'] },
  mil: { primary: '#00471B', secondary: '#EEE1C6', name: 'BUCKS', eras: ['1968-1993', '1993-2006', '2006-2015'] },
  ind: { primary: '#002D62', secondary: '#FDBB30', name: 'PACERS', eras: ['1967-1976', '1976-1990', '1990-2005', '2005-2017'] },
  cle: { primary: '#6F263D', secondary: '#FFB81C', name: 'CAVS', eras: ['1970-1983', '1983-1994', '1994-2003', '2003-2010'] },
  det: { primary: '#C8102E', secondary: '#1D428A', name: 'PISTONS', eras: ['1957-1978', '1978-1996', '1996-2001', '2005-2017'] },
}

const dir = path.join(process.cwd(), 'public', 'logos')
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

Object.entries(teams).forEach(([slug, team]) => {
  team.eras.forEach((era) => {
    const filename = `${slug}-${era}.svg`
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <circle cx="200" cy="200" r="190" fill="${team.primary}" stroke="${team.secondary}" stroke-width="10"/>
  <text x="200" y="180" font-family="Arial, sans-serif" font-weight="bold" font-size="64" fill="${team.secondary}" text-anchor="middle">${team.name}</text>
  <text x="200" y="240" font-family="Arial, sans-serif" font-weight="bold" font-size="36" fill="${team.secondary}" text-anchor="middle">${era}</text>
</svg>`
    
    fs.writeFileSync(path.join(dir, filename), svg)
  })
})

console.log('Successfully generated SVG logos!')
