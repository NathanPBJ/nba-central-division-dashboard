import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { getTeamLivePayload } from './src/server/teamLiveData.js'

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'team-live-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.startsWith('/api/teams/') && req.url.includes('/live')) {
            const url = new URL(req.url, 'http://localhost')
            const parts = url.pathname.split('/')
            const teamSlug = parts[3]
            
            getTeamLivePayload(teamSlug, { forceRefresh: url.searchParams.has('refresh') })
              .then(payload => {
                sendJson(res, 200, payload)
              })
              .catch(error => {
                sendJson(res, 502, {
                  error: error instanceof Error ? error.message : `Failed to refresh ${teamSlug} feed`,
                })
              })
          } else {
            next()
          }
        })
      },
    },
  ],
})
