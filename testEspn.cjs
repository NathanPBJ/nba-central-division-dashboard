const players = [
  { name: 'Michael Jordan', id: '1035' },
  { name: 'Scottie Pippen', id: '663' },
  { name: 'Kareem Abdul-Jabbar', id: '15' },
  { name: 'Reggie Miller', id: '552' },
  { name: 'Isiah Thomas', id: '3443026' }, 
  { name: 'Ben Wallace', id: '885' },
  { name: 'LeBron James', id: '1966' },
  { name: 'Paul George', id: '4251' }
];

async function check() {
  for (let p of players) {
    const resAction = await fetch(`https://a.espncdn.com/i/headshots/nba/players/action/${p.id}.png`);
    const resFull = await fetch(`https://a.espncdn.com/i/headshots/nba/players/full/${p.id}.png`);
    console.log(p.name, 'Action:', resAction.status, 'Full:', resFull.status);
  }
}
check();
