import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'node:path'

// Serve /speaker-tips (no trailing slash) from speaker-tips/index.html in dev and preview
const cleanUrls = {
  name: 'clean-urls',
  configureServer(server) {
    server.middlewares.use(rewriteSpeakerTips)
  },
  configurePreviewServer(server) {
    server.middlewares.use(rewriteSpeakerTips)
  },
}

function rewriteSpeakerTips(req, _res, next) {
  if (req.url === '/speaker-tips') req.url = '/speaker-tips/index.html'
  next()
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), cleanUrls],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        speakerTips: resolve(__dirname, 'speaker-tips/index.html'),
      },
    },
  },
})
