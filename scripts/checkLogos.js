import https from 'https'

const urls = [
  'https://sportslogohistory.com/wp-content/uploads/2017/12/indiana_pacers_1990-2005.png',
  'https://sportslogohistory.com/wp-content/uploads/2017/12/indiana_pacers_1967-1976.png'
]

urls.forEach(url => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    console.log(url, res.statusCode)
  })
})
