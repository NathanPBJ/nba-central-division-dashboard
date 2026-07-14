import * as fallbackData from '../data/pacersData'

/**
 * Fetches live data from the server proxy.
 * Throws an error if the request fails, which React Query will catch.
 */
export async function fetchPacersLive() {
  const response = await fetch('/api/pacers/live')
  if (!response.ok) {
    throw new Error('Failed to fetch live Pacers data')
  }
  const payload = await response.json()
  return payload
}

/**
 * The key used by React Query to identify this data.
 */
export const pacersQueryKey = ['pacers', 'live']

/**
 * Query options for fetching Pacers data.
 * Tries the network first. If it fails, falls back to local data gracefully.
 */
export const pacersQueryOptions = {
  queryKey: pacersQueryKey,
  queryFn: async () => {
    try {
      return await fetchPacersLive()
    } catch (error) {
      console.warn('Live fetch failed, using fallback data.', error)
      return {
        ...fallbackData,
        source: {
          label: 'Local fallback dataset',
          season: 'fallback',
          fetchedAt: '',
        },
      }
    }
  },
  staleTime: 1000 * 60 * 2, // Consider data fresh for 2 minutes
  refetchOnWindowFocus: true, // Auto refetch when user comes back
}
