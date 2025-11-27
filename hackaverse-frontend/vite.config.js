/* eslint-env node */
/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  // Get port from environment variable or default to 3000
  const port = parseInt(process.env.PORT) || 3000;
  
  return {
    plugins: [react()],
    server: {
      port,
      strictPort: false, // Allow fallback to another port if specified port is busy
      host: true
    }
  };
})
