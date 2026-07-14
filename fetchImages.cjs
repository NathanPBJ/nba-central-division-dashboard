const fs = require('fs');

async function run() {
  const teams = ['ind', 'chi', 'mil', 'cle', 'det'];
  const playerImages = {};

  for (const team of teams) {
    console.log('Fetching roster for', team);
    const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${team}/roster`);
    const data = await res.json();
    const athletes = data.athletes || [];

    for (const athlete of athletes) {
      const name = athlete.displayName;
      // Try wikipedia search
      const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`);
      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        if (wikiData.originalimage && wikiData.originalimage.source) {
          playerImages[name] = wikiData.originalimage.source;
          console.log(`Found image for ${name}: ${wikiData.originalimage.source}`);
        } else {
          console.log(`No image on wiki for ${name}`);
        }
      } else {
        console.log(`Wiki page not found for ${name}`);
      }
    }
  }

  fs.writeFileSync('src/data/playerActionShots.json', JSON.stringify(playerImages, null, 2));
  console.log('Done!');
}

run();
