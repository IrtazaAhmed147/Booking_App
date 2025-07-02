// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // your backend base URL
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api') // keep `/api` in the path
      }
    }
  }
})
