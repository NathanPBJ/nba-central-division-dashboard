async function check() {
  const urls = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Michael_Jordan_in_1987.jpg/800px-Michael_Jordan_in_1987.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Kareem_Abdul-Jabbar_1974.jpg/800px-Kareem_Abdul-Jabbar_1974.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Reggie_Miller_2008.jpg/800px-Reggie_Miller_2008.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Isiah_Thomas_1988.jpg/800px-Isiah_Thomas_1988.jpg'
  ];
  for (let u of urls) {
    const r = await fetch(u);
    console.log(r.status, u);
  }
}
check();
