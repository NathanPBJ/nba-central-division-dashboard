/**
 * Fetches live data from the server proxy.
 * Throws an error if the request fails, which React Query will catch.
 */
export async function fetchTeamLive(teamSlug) {
  const response = await fetch(`/api/teams/${teamSlug}/live`)
  if (!response.ok) {
    throw new Error(`Failed to fetch live data for ${teamSlug}`)
  }
  const payload = await response.json()
  return payload
}

/**
 * The key used by React Query to identify this data.
 */
export const teamQueryKey = (teamSlug) => ['team', teamSlug, 'live']

/**
 * Query options for fetching Team data.
 */
export const teamQueryOptions = (teamSlug) => ({
  queryKey: teamQueryKey(teamSlug),
  queryFn: async () => {
    return await fetchTeamLive(teamSlug)
  },
  staleTime: 1000 * 60 * 2, // Consider data fresh for 2 minutes
  refetchOnWindowFocus: true, // Auto refetch when user comes back
})
