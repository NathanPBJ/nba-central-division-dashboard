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
      // follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = 'http://web.archive.org' + loc;
        return download(loc, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`Status ${res.statusCode}`))
      const file = fs.createWriteStream(dest)
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', reject)
  })
}

async function scrape() {
  const dir = path.join(process.cwd(), 'public', 'logos')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  
  for (const [slug, team] of Object.entries(teams)) {
    const url = `http://web.archive.org/web/20230505121212/https://www.sportslogos.net/logos/list_by_team/${team.id}/${team.name}/`
    console.log(`Fetching ${slug} via Wayback...`)
    try {
      const res = await fetch(url)
      const html = await res.text()
      
      const matches = [...html.matchAll(/<img[^>]+src="([^"]+)"[^>]+alt="[^"]+\(\s*(\d{4})\s*-\s*\d{4}\s*\)\s*Primary Logo"[^>]*>/gi)]
      
      for (const m of matches) {
        let imgUrl = m[1]
        const startYear = m[2]
        
        const matchedEra = team.eras.find(e => Math.abs(parseInt(e) - parseInt(startYear)) <= 2)
        if (matchedEra) {
          if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl
          else if (imgUrl.startsWith('/web/')) imgUrl = 'http://web.archive.org' + imgUrl
          
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
            const filename = `${slug}-${targetEraName}.png`
            console.log(`Downloading ${imgUrl} -> ${filename}`)
            try {
              // we don't want the thumbnail, we want the high-res gif if possible, but thumbnail is okay for now.
              // sportslogos thumbs are like .../thumbs/123.gif.
              await download(imgUrl, path.join(dir, filename))
            } catch (e) {
              console.log(`Failed to download ${imgUrl}: ${e.message}`)
            }
          }
        }
      }
    } catch(e) {
      console.error(`Error processing ${slug}:`, e.message)
    }
  }
}
scrape()
