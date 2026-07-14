const players = [
  { name: 'Coby White', id: '4277775' },
  { name: 'Giannis', id: '3032977' },
  { name: 'Haliburton', id: '4396993' },
  { name: 'Donovan Mitchell', id: '3908809' },
  { name: 'Cade Cunningham', id: '4277848' },
  { name: 'Kyrie Irving', id: '6442' }
];

async function check() {
  for (let p of players) {
    const resFull = await fetch(`https://a.espncdn.com/i/headshots/nba/players/full/${p.id}.png`);
    console.log(p.name, 'Full:', resFull.status);
  }
}
check();
