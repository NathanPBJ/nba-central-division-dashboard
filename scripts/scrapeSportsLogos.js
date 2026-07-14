import fs from 'fs'
import path from 'path'
import https from 'https'

const teams = {
  mil: { id: '225', name: 'Milwaukee_Bucks', eras: ['1969', '1994', '2007', '2016'] },
  ind: { id: '224', name: 'Indiana_Pacers', eras: ['1968', '1977', '1991', '2006', '2018'] },
  cle: { id: '222', name: 'Cleveland_Cavaliers', eras: ['1971', '1984', '1995', '2004', '2023'] },
  det: { id: '223', name: 'Detroit_Pistons', eras: ['1958', '1979', '1997', '2006', '2018'] }
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) return reject(new Error(`Status ${res.statusCode}`))
      const file = fs.createWriteStream(dest)
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', reject)
  })
}

async function scrape() {
  const dir = path.join(process.cwd(), 'public', 'logos')
  
  for (const [slug, team] of Object.entries(teams)) {
    const url = `https://www.sportslogos.net/logos/list_by_team/${team.id}/${team.name}/`
    console.log(`Fetching ${slug}...`)
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
      const html = await res.text()
      
      // We look for primary logos which are under "Primary Logos"
      const matches = [...html.matchAll(/<a href="[^"]+">\s*<img src="([^"]+)" alt="[^"]+Primary Logo[^"]+" \/>\s*<\/a>\s*<p><a href="[^"]+">([^<]+)<\/a>/gi)]
      
      for (const m of matches) {
        let imgUrl = m[1]
        const yearRange = m[2].trim() // e.g. "1991/92 - 2004/05"
        
        // Extract the start year
        const startYearMatch = yearRange.match(/^(\d{4})/)
        if (!startYearMatch) continue
        const startYear = startYearMatch[1]
        
        // Is this an era we care about?
        const matchedEra = team.eras.find(e => Math.abs(parseInt(e) - parseInt(startYear)) <= 2)
        if (matchedEra) {
          // the imgUrl might be missing https:
          if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl
          
          let targetEraName = ''
          if (slug === 'ind') {
            if (matchedEra === '1968') targetEraName = '1967-1976'
            if (matchedEra === '1977') targetEraName = '1976-1990'
            if (matchedEra === '1991') targetEraName = '1990-2005'
            if (matchedEra === '2006') targetEraName = '2005-2017'
          }
          if (slug === 'mil') {
            if (matchedEra === '1969') targetEraName = '1968-1993'
            if (matchedEra === '1994') targetEraName = '1993-2006'
            if (matchedEra === '2007') targetEraName = '2006-2015'
          }
          if (slug === 'cle') {
            if (matchedEra === '1971') targetEraName = '1970-1983'
            if (matchedEra === '1984') targetEraName = '1983-1994'
            if (matchedEra === '1995') targetEraName = '1994-2003'
            if (matchedEra === '2004') targetEraName = '2003-2010'
          }
          if (slug === 'det') {
            if (matchedEra === '1958') targetEraName = '1957-1978'
            if (matchedEra === '1979') targetEraName = '1978-1996'
            if (matchedEra === '1997') targetEraName = '1996-2001'
            if (matchedEra === '2006') targetEraName = '2005-2017'
          }
          
          if (targetEraName) {
            const filename = `${slug}-${targetEraName}.png` // download as PNG
            console.log(`Downloading ${imgUrl} -> ${filename}`)
            await download(imgUrl, path.join(dir, filename))
          }
        }
      }
    } catch(e) {
      console.error(`Error processing ${slug}:`, e.message)
    }
  }
}
scrape()
