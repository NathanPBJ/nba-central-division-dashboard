const fs = require('fs');
const html = fs.readFileSync('bball_ref.html', 'utf8');
const teams = ['Chicago Bulls', 'Milwaukee Bucks', 'Indiana Pacers', 'Cleveland Cavaliers', 'Detroit Pistons'];
const output = {};

teams.forEach(team => {
  const index = html.indexOf('>' + team + '<');
  if (index !== -1) {
    const rowStart = html.lastIndexOf('<tr', index);
    const rowEnd = html.indexOf('</tr>', index);
    const rowHtml = html.substring(rowStart, rowEnd + 5);
    
    const fgAtRimMatch = rowHtml.match(/data-stat="fg_pct_00_03".*?>(.*?)<\/td>/);
    const fg3To10Match = rowHtml.match(/data-stat="fg_pct_03_10".*?>(.*?)<\/td>/);
    const fg10To16Match = rowHtml.match(/data-stat="fg_pct_10_16".*?>(.*?)<\/td>/);
    const fg16To3PtMatch = rowHtml.match(/data-stat="fg_pct_16_xx".*?>(.*?)<\/td>/);
    const fg3PtMatch = rowHtml.match(/data-stat="fg_pct_3a".*?>(.*?)<\/td>/);

    output[team] = {
      atRim: fgAtRimMatch ? parseFloat(fgAtRimMatch[1]) : 0,
      threeToTen: fg3To10Match ? parseFloat(fg3To10Match[1]) : 0,
      tenToSixteen: fg10To16Match ? parseFloat(fg10To16Match[1]) : 0,
      sixteenTo3Pt: fg16To3PtMatch ? parseFloat(fg16To3PtMatch[1]) : 0,
      threePt: fg3PtMatch ? parseFloat(fg3PtMatch[1]) : 0,
    };
  }
});
console.log(JSON.stringify(output, null, 2));
fs.writeFileSync('src/data/teamShootingStats.json', JSON.stringify(output, null, 2));
