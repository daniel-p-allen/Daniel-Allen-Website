import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // Vitest shares this config, so the components are compiled the same way in tests
  // as they are in the real build. Component tests live beside the end-to-end tests
  // in tests/, but only the unit ones run here — Playwright drives its own.
  test: {
    environment: 'jsdom',
    include: ['tests/unit/**/*.test.js'],
    globals: true
  }
})
