import fs from 'fs'
import path from 'path'

// NBA Player IDs mapped to our local filenames
const players = [
  { name: 'Tyrese Haliburton', file: 'tyrese-haliburton.jpeg', nbaId: 1630169 },
  { name: 'Pascal Siakam', file: 'pascal-siakam.jpeg', nbaId: 1627783 },
  { name: 'Myles Turner', file: 'myles-turner.jpeg', nbaId: 1626167 },
  { name: 'Bennedict Mathurin', file: 'bennedict-mathurin.jpeg', nbaId: 1631097 },
  { name: 'Aaron Nesmith', file: 'aaron-nesmith.jpeg', nbaId: 1630174 },
  { name: 'Andrew Nembhard', file: 'andrew-nembhard.jpeg', nbaId: 1631212 },
  { name: 'T.J. McConnell', file: 'tj-mcconnell.jpeg', nbaId: 204456 },
  { name: 'Obi Toppin', file: 'obi-toppin.jpeg', nbaId: 1630167 },
  { name: 'Ben Sheppard', file: 'ben-sheppard.jpeg', nbaId: 1641767 },
  { name: 'Isaiah Jackson', file: 'isaiah-jackson.jpeg', nbaId: 1630543 },
  { name: 'Jarace Walker', file: 'jarace-walker.jpeg', nbaId: 1641716 },
  { name: 'Johnny Furphy', file: 'johnny-furphy.jpeg', nbaId: 1642277 },
]

const dir = path.join(process.cwd(), 'public', 'players')

// NBA.com action shot CDN patterns to try (from largest to smallest)
const urlPatterns = [
  (id) => `https://ak-static.cms.nba.com/wp-content/uploads/actionshots/${id}.png`,
  (id) => `https://cdn.nba.com/manage/2024/combined/action/${id}_action.png`,
]

async function tryDownload(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
      'Referer': 'https://www.nba.com/',
      'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
    },
  })
  if (!res.ok) return null
  const contentType = res.headers.get('content-type') || ''
  if (!contentType.startsWith('image')) return null
  const buf = Buffer.from(await res.arrayBuffer())
  // Only accept if it's reasonably large (>20KB = real photo, not a placeholder)
  if (buf.length < 20000) return null
  return buf
}

async function download() {
  for (const player of players) {
    const dest = path.join(dir, player.file)
    console.log(`\n🔍 Searching action shot for ${player.name} (ID: ${player.nbaId})...`)

    let downloaded = false

    // Try NBA CDN patterns
    for (const pattern of urlPatterns) {
      const url = pattern(player.nbaId)
      console.log(`  Trying: ${url}`)
      try {
        const buf = await tryDownload(url)
        if (buf) {
          fs.writeFileSync(dest, buf)
          console.log(`  ✅ Downloaded ${(buf.length / 1024).toFixed(0)}KB -> ${player.file}`)
          downloaded = true
          break
        }
      } catch (e) {
        // continue
      }
    }

    if (!downloaded) {
      // Try NBA.com player page to scrape action photo URL
      const playerSlug = player.name.toLowerCase().replace(/[^a-z ]/g, '').replace(/ /g, '-')
      const pageUrl = `https://www.nba.com/player/${player.nbaId}/${playerSlug}`
      console.log(`  Trying page: ${pageUrl}`)
      try {
        const res = await fetch(pageUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        })
        if (res.ok) {
          const html = await res.text()
          // Look for action shot URLs in the HTML
          const actionMatches = html.match(/https:\/\/cdn\.nba\.com\/[^"'\s]*action[^"'\s]*/gi)
          const playerImgMatches = html.match(/https:\/\/cdn\.nba\.com\/[^"'\s]*\/players\/[^"'\s]*\.(jpg|jpeg|png)/gi)
          const allMatches = [...(actionMatches || []), ...(playerImgMatches || [])]
          
          // Filter out headshots
          const actionUrls = allMatches.filter(u => !u.includes('headshot') && !u.includes('logo'))
          
          if (actionUrls.length > 0) {
            console.log(`  Found ${actionUrls.length} candidate URLs`)
            for (const imgUrl of actionUrls.slice(0, 3)) {
              console.log(`  Trying: ${imgUrl}`)
              const buf = await tryDownload(imgUrl)
              if (buf) {
                fs.writeFileSync(dest, buf)
                console.log(`  ✅ Downloaded ${(buf.length / 1024).toFixed(0)}KB -> ${player.file}`)
                downloaded = true
                break
              }
            }
          }
        }
      } catch (e) {
        // continue
      }
    }

    if (!downloaded) {
      console.log(`  ⚠️ Keeping existing file for ${player.name}`)
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 500))
  }

  console.log('\n✅ Done!')
}

download()
