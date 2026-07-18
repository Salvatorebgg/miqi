import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/miqi/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Miqi Learning',
        short_name: 'Miqi',
        description: 'A focused personal learning cockpit.',
        theme_color: '#dff4ea',
        background_color: '#f7fffb',
        display: 'standalone',
        start_url: '/miqi/'
      }
    })
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true
  }
})
