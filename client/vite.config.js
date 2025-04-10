import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: [
      '8ca9-2409-40e6-2e-c6bf-304f-1695-c54e-bcda.ngrok-free.app',
      '.ngrok-free.app', // This wildcard allows any ngrok-free.app subdomain
    ]
  }
})
