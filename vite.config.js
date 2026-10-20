import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'

// Link previews (WhatsApp, Telegram) don't run JS, so bake the event date from TicketCard into the HTML
const eventDate = {
  name: 'event-date',
  transformIndexHtml: {
    order: 'pre',
    handler(html) {
      const source = readFileSync(resolve(__dirname, 'src/lib/TicketCard.svelte'), 'utf-8')
      const date = source.match(/defaultEventDate\s*=\s*"([^"]+)"/)?.[1]
      if (!date) throw new Error('defaultEventDate not found in TicketCard.svelte')
      return html.replaceAll('__EVENT_DATE__', date)
    },
  },
}

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
  plugins: [svelte(), eventDate, cleanUrls],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        speakerTips: resolve(__dirname, 'speaker-tips/index.html'),
      },
    },
  },
})
