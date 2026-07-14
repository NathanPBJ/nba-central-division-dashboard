import { useMemo } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { getInsights } from './utils/helpers'

export function Root() {
  const data = useLoaderData()
  const insights = useMemo(() => getInsights(data.playerStats, data.teamStats), [data.playerStats, data.teamStats])

  return (
    <Layout data={data}>
      <Outlet context={{ data, insights }} />
    </Layout>
  )
}
