import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/competitions': {
        target: 'https://api.football-data.org/v4',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/competitions/, '/competitions')
      },
      '/api/teams': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/teams/, '/api/teams')
      }
    }
  }
})
