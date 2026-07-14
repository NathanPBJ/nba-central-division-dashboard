import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { getPacersLivePayload } from './src/server/pacersLiveData.js'

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
      name: 'pacers-live-api',
      configureServer(server) {
        server.middlewares.use('/api/pacers/live', async (req, res) => {
          try {
            const url = new URL(req.url || '', 'http://localhost')
            sendJson(res, 200, await getPacersLivePayload({ forceRefresh: url.searchParams.has('refresh') }))
          } catch (error) {
            sendJson(res, 502, {
              error: error instanceof Error ? error.message : 'Failed to refresh Pacers feed',
            })
          }
        })
      },
    },
  ],
})
