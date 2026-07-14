import fs from 'fs'
import path from 'path'
import https from 'https'

const teams = {
  chi: { name: 'Chicago Bulls', eras: ['1966'] },
  mil: { name: 'Milwaukee Bucks', eras: ['1968', '1993', '2006'] },
  ind: { name: 'Indiana Pacers', eras: ['1967', '1976', '1990', '2005'] },
  cle: { name: 'Cleveland Cavaliers', eras: ['1970', '1983', '1994', '2003'] },
  det: { name: 'Detroit Pistons', eras: ['1957', '1978', '1996', '2005'] }
}

const dir = path.join(process.cwd(), 'public', 'logos')

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      // follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`Status ${res.statusCode}`))
      const file = fs.createWriteStream(dest)
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', reject)
  })
}

async function searchGoogleImages(query) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' logo png transparent')}`
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  })
  const html = await res.text()
  
  // Look for image links in DuckDuckGo HTML
  const matches = [...html.matchAll(/<img[^>]+src="([^"]+)"/gi)]
  // Usually DuckDuckGo proxies images. The first few are usually icons. Let's find a valid proxy url.
  for (const m of matches) {
    if (m[1].includes('external-content.duckduckgo.com')) {
      return m[1]
    }
  }
  throw new Error("No image found in DDG HTML")
}

async function run() {
  for (const [slug, team] of Object.entries(teams)) {
    for (const era of team.eras) {
      const query = `${team.name} ${era}`
      console.log(`Searching for: ${query}`)
      try {
        const imgUrl = await searchGoogleImages(query)
        if (imgUrl) {
          console.log(`Found: ${imgUrl}`)
          // map to era name
          let targetEraName = ''
          if (slug === 'ind') {
            if (era === '1967') targetEraName = '1967-1976'
            if (era === '1976') targetEraName = '1976-1990'
            if (era === '1990') targetEraName = '1990-2005'
            if (era === '2005') targetEraName = '2005-2017'
          }
          if (slug === 'mil') {
            if (era === '1968') targetEraName = '1968-1993'
            if (era === '1993') targetEraName = '1993-2006'
            if (era === '2006') targetEraName = '2006-2015'
          }
          if (slug === 'cle') {
            if (era === '1970') targetEraName = '1970-1983'
            if (era === '1983') targetEraName = '1983-1994'
            if (era === '1994') targetEraName = '1994-2003'
            if (era === '2003') targetEraName = '2003-2010'
          }
          if (slug === 'det') {
            if (era === '1957') targetEraName = '1957-1978'
            if (era === '1978') targetEraName = '1978-1996'
            if (era === '1996') targetEraName = '1996-2001'
            if (era === '2005') targetEraName = '2005-2017'
          }
          if (slug === 'chi') {
            if (era === '1966') targetEraName = '1966-Present'
          }
          
          if (targetEraName) {
            const filename = `${slug}-${targetEraName}.png`
            let fetchUrl = imgUrl;
            if (fetchUrl.startsWith('//')) fetchUrl = 'https:' + fetchUrl;
            
            // duckduckgo external content URLs are valid to download directly!
            await downloadImage(fetchUrl, path.join(dir, filename))
            console.log(`Downloaded ${filename}`)
          }
        }
      } catch (err) {
        console.error(`Failed: ${query}`, err.message)
      }
    }
  }
}

run()
