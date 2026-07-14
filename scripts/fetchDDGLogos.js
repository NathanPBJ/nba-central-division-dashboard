import fs from 'fs'
import path from 'path'
import { image_search } from 'duckduckgo-images-api'
import https from 'https'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const teams = {
  chi: { name: 'Chicago Bulls', eras: ['1966'] },
  mil: { name: 'Milwaukee Bucks', eras: ['1968', '1993', '2006'] },
  ind: { name: 'Indiana Pacers', eras: ['1967', '1976', '1990', '2005'] },
  cle: { name: 'Cleveland Cavaliers', eras: ['1970', '1983', '1994', '2003'] },
  det: { name: 'Detroit Pistons', eras: ['1957', '1978', '1996', '2005'] },
}

const dir = path.join(process.cwd(), 'public', 'logos')

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) return reject(new Error(`Status ${res.statusCode}`))
      const file = fs.createWriteStream(dest)
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', reject)
  })
}

async function run() {
  for (const [slug, team] of Object.entries(teams)) {
    for (const era of team.eras) {
      const query = `${team.name} ${era} logo transparent png`
      console.log(`Searching for: ${query}`)
      try {
        const results = await image_search({ query, moderate: true, iterations: 1 })
        if (results && results.length > 0) {
          const imgUrl = results[0].image
          console.log(`Found: ${imgUrl}`)
          // We will find the corresponding era string
          let fullEra = ''
          if (slug === 'ind' && era === '1967') fullEra = '1967-1976'
          if (slug === 'ind' && era === '1976') fullEra = '1976-1990'
          if (slug === 'ind' && era === '1990') fullEra = '1990-2005'
          if (slug === 'ind' && era === '2005') fullEra = '2005-2017'
          // We can just name them dynamically, but let's map them properly
          const filename = `${slug}-${era}.png`
          await downloadImage(imgUrl, path.join(dir, filename))
          console.log(`Downloaded ${filename}`)
        }
      } catch (err) {
        console.error(`Failed: ${query}`, err.message)
      }
    }
  }
}

run()
