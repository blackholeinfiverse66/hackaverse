/* eslint-env node */
/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  const port = parseInt(process.env.PORT) || 3000

  return {
    plugins: [react()],
    base: '/', // required for Vercel static deployment
    server: {
      port,
      strictPort: false,
      host: true
    }
  }
})
