import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate, useParams } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMachine } from '@xstate/react'
import { appMachine } from './machines/appMachine'
import { SkeletonLoader } from './components/ui/SkeletonLoader'
import { ErrorFallback } from './components/ui/ErrorFallback'
import './index.css'

import { Root } from './App.jsx'
import { MainMenu } from './pages/MainMenu'
import { Overview } from './pages/Overview'
import { Roster } from './pages/Roster'
import { Leaders } from './pages/Leaders'
import { TeamProfile } from './pages/TeamProfile'
import { FormGuide } from './pages/FormGuide'
import { Archive } from './pages/Archive'

import { teamQueryOptions } from './api/queries'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainMenu />,
  },
  {
    path: '/:teamSlug',
    element: <Root />,
    loader: async ({ params }) => {
      return await queryClient.ensureQueryData(teamQueryOptions(params.teamSlug))
    },
    children: [
      { index: true, element: <Overview /> },
      { path: 'rotation', element: <Roster /> },
      { path: 'leaders', element: <Leaders /> },
      { path: 'profile', element: <TeamProfile /> },
      { path: 'form', element: <FormGuide /> },
      { path: 'archive', element: <Archive /> },
      { path: '*', element: <Navigate to="." replace /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
])

function AppWrapper() {
  const [state, send] = useMachine(appMachine)
  const [errorContext, setErrorContext] = useState(null)

  useEffect(() => {
    if (state.matches('idle')) {
      send({ type: 'FETCH' })
    }
    if (state.matches('loading')) {
      // We don't prefetch a specific team globally anymore on mount.
      // Data fetching is handled by the route loader.
      send({ type: 'SUCCESS' })
    }
  }, [state.value, send])

  if (state.matches('idle') || state.matches('loading')) {
    return <SkeletonLoader />
  }

  if (state.matches('error')) {
    return <ErrorFallback error={errorContext} onRetry={() => send({ type: 'RETRY' })} />
  }

  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppWrapper />
    </QueryClientProvider>
  </StrictMode>
)
