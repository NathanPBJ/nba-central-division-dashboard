import fs from 'fs'
import path from 'path'
import https from 'https'

const teamPages = {
  mil: 'https://en.wikipedia.org/wiki/Milwaukee_Bucks',
  ind: 'https://en.wikipedia.org/wiki/Indiana_Pacers',
  cle: 'https://en.wikipedia.org/wiki/Cleveland_Cavaliers',
  det: 'https://en.wikipedia.org/wiki/Detroit_Pistons',
  chi: 'https://en.wikipedia.org/wiki/Chicago_Bulls'
}

async function scrape() {
  for (const [slug, url] of Object.entries(teamPages)) {
    try {
      console.log(`Fetching ${slug}...`)
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
      const html = await res.text()
      
      // Look for any image link containing 'logo'
      const matches = [...html.matchAll(/src="\/\/(upload\.wikimedia\.org\/[^"]+logo[^"]*\.png)"/gi)]
      const imgUrls = [...new Set(matches.map(m => 'https://' + m[1]))]
      
      console.log(`Found ${imgUrls.length} logos for ${slug}:`)
      imgUrls.forEach(u => console.log(u))
      
    } catch(e) {
      console.error(`Error processing ${slug}:`, e.message)
    }
  }
}

scrape()
