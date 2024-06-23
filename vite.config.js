import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  define: {
    __APP_VERSION__: JSON.stringify('v1.0.0'),
    __API_URL__: JSON.stringify('http://localhost:8000/api'),
    VITE_APP_TITLE: JSON.stringify('Leaver Board'),
  },
  server: {
    port: 3030
  },
  preview: {
    port: 8080
  },
  fs: {
    allow: ['..']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
