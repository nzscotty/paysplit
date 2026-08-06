import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['paysplit-mark.svg'],
      manifest: {
        name: 'Paysplit',
        short_name: 'Paysplit',
        description: 'Give every dollar a direction.',
        theme_color: '#f5f0e7',
        background_color: '#f5f0e7',
        display: 'standalone',
        icons: [
          {
            src: 'paysplit-mark.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})
