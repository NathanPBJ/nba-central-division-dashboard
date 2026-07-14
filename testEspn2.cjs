const players = [
  { name: 'Derrick Rose', id: '3456' },
  { name: 'Dennis Rodman', id: '702' },
  { name: 'Ray Allen', id: '9' },
  { name: 'Jermaine ONeal', id: '615' },
  { name: 'Victor Oladipo', id: '2527963' },
  { name: 'Chauncey Billups', id: '63' },
  { name: 'Richard Hamilton', id: '294' }
];

async function check() {
  for (let p of players) {
    const resFull = await fetch(`https://a.espncdn.com/i/headshots/nba/players/full/${p.id}.png`);
    console.log(p.name, 'Full:', resFull.status);
  }
}
check();
