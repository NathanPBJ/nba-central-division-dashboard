import fs from 'fs'
import path from 'path'
import { image_search } from 'duckduckgo-images-api'

const players = [
  { name: "Tyrese Haliburton", file: "tyrese-haliburton.jpeg" },
  { name: "Pascal Siakam", file: "pascal-siakam.jpeg" },
  { name: "Myles Turner", file: "myles-turner.jpeg" },
  { name: "Bennedict Mathurin", file: "bennedict-mathurin.jpeg" },
  { name: "Aaron Nesmith", file: "aaron-nesmith.jpeg" },
  { name: "Andrew Nembhard", file: "andrew-nembhard.jpeg" },
  { name: "T.J. McConnell", file: "tj-mcconnell.jpeg" },
  { name: "Obi Toppin", file: "obi-toppin.jpeg" },
  { name: "Ben Sheppard", file: "ben-sheppard.jpeg" },
  { name: "Isaiah Jackson", file: "isaiah-jackson.jpeg" },
  { name: "Jarace Walker", file: "jarace-walker.jpeg" },
  { name: "Johnny Furphy", file: "johnny-furphy.jpeg" }
];

const dir = path.join(process.cwd(), 'public', 'players');

async function download() {
  for (const player of players) {
    const dest = path.join(dir, player.file);
    console.log(`\nSearching HD action shot for ${player.name}...`);
    
    try {
      const results = await image_search({ query: `${player.name} Indiana Pacers court action game dunk 2024 HD`, moderate: true });
      if (results && results.length > 0) {
        // Try to find a good HD horizontal/large image
        let bestImage = results.find(r => r.width > 1200 && r.height > 800 && r.image.includes('https'));
        if (!bestImage) bestImage = results[0];
        
        console.log(`Selected image URL: ${bestImage.image}`);
        
        const response = await fetch(bestImage.image, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        
        if (!response.ok) {
            console.log(`Failed to fetch ${bestImage.image}: HTTP ${response.status}`);
            continue;
        }
        
        const arrayBuffer = await response.arrayBuffer();
        fs.writeFileSync(dest, Buffer.from(arrayBuffer));
        console.log(`✅ OVERWRITTEN ${player.file}`);
      } else {
        console.log(`❌ No results found for ${player.name}`);
      }
    } catch (err) {
      console.error(`⚠️ Failed for ${player.name}:`, err.message);
    }
    
    // Slight delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 1000));
  }
}

download();
