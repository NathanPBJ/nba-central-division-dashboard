import fs from 'fs'
import https from 'https'
import path from 'path'

async function scrape() {
  try {
    const res = await fetch('https://logodix.com/indiana-pacers-logos', { headers: { 'User-Agent': 'Mozilla/5.0' } })
    const html = await res.text()
    
    const matches = [...html.matchAll(/src="([^"]+\.png)"/gi)]
    console.log("Found matches:", matches.map(m => m[1]).slice(0, 10))
  } catch (err) {
    console.error(err)
  }
}
scrape()
