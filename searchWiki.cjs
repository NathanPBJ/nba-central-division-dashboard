async function searchWiki(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&pithumbsize=800`;
  const res = await fetch(url);
  const data = await res.json();
  const pages = data.query?.pages;
  if (pages) {
    const page = Object.values(pages)[0];
    console.log(query, page.thumbnail?.source);
  } else {
    console.log(query, 'No image');
  }
}
async function run() {
  await searchWiki('Michael Jordan dunks');
  await searchWiki('Kareem Abdul-Jabbar skyhook');
  await searchWiki('Reggie Miller pacers');
  await searchWiki('Isiah Thomas pistons');
}
run();
