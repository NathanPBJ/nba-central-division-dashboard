const fs = require('fs');

async function run() {
  const res = await fetch('https://stats.nba.com/stats/playerindex?College=&Country=&DraftPick=&DraftRound=&DraftYear=&Height=&Historical=1&LeagueID=00&Season=2024-25&SeasonType=Regular%20Season&TeamID=0&Weight=', {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
      'Referer': 'https://www.nba.com/'
    }
  });
  const data = await res.json();
  const players = data.resultSets[0].rowSet;
  const nameToId = {};
  for (const p of players) {
    const id = p[0];
    const lastName = p[1];
    const firstName = p[2];
    const fullName = `${firstName} ${lastName}`;
    nameToId[fullName] = id;
  }
  
  fs.writeFileSync('src/data/nbaPlayerIds.json', JSON.stringify(nameToId, null, 2));
  console.log('Saved ' + Object.keys(nameToId).length + ' players.');
}
run();
