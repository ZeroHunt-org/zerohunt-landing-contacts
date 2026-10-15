import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Multi-page build: GitHub Pages has no SPA fallback, so every path needs its
// own index.html. All three load the same bundle; App picks the page by path.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        mediaKit: resolve(__dirname, 'media-kit/index.html'),
        pressKit: resolve(__dirname, 'press-kit/index.html'),
      },
    },
  },
})
