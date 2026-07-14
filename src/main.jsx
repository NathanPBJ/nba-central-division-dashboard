import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMachine } from '@xstate/react'
import { appMachine } from './machines/appMachine'
import { SkeletonLoader } from './components/ui/SkeletonLoader'
import { ErrorFallback } from './components/ui/ErrorFallback'
import './index.css'

import { Root } from './App.jsx'
import { Overview } from './pages/Overview'
import { Roster } from './pages/Roster'
import { Leaders } from './pages/Leaders'
import { TeamProfile } from './pages/TeamProfile'
import { FormGuide } from './pages/FormGuide'
import { Archive } from './pages/Archive'

import { pacersQueryOptions } from './api/queries'

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
    element: <Root />,
    loader: async () => {
      // Ensure data is fetched and cached before rendering the route
      return await queryClient.ensureQueryData(pacersQueryOptions)
    },
    children: [
      { index: true, element: <Overview /> },
      { path: 'rotation', element: <Roster /> },
      { path: 'leaders', element: <Leaders /> },
      { path: 'profile', element: <TeamProfile /> },
      { path: 'form', element: <FormGuide /> },
      { path: 'archive', element: <Archive /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

function AppWrapper() {
  const [state, send] = useMachine(appMachine)
  const [errorContext, setErrorContext] = useState(null)

  useEffect(() => {
    if (state.matches('idle')) {
      send({ type: 'FETCH' })
    }
    if (state.matches('loading')) {
      queryClient.ensureQueryData(pacersQueryOptions)
        .then(() => send({ type: 'SUCCESS' }))
        .catch((err) => {
          setErrorContext(err)
          send({ type: 'ERROR' })
        })
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
