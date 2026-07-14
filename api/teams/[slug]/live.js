import { getTeamLivePayload } from '../../../src/server/teamLiveData.js'

export default async function handler(req, res) {
  const { slug, refresh } = req.query
  
  try {
    const payload = await getTeamLivePayload(slug, { 
      forceRefresh: refresh === 'true' || refresh === '' 
    })
    res.status(200).json(payload)
  } catch (error) {
    console.error('Error fetching live data:', error)
    res.status(502).json({
      error: error instanceof Error ? error.message : `Failed to refresh ${slug} feed`,
    })
  }
}
