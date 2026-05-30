// Sakura Moon Atelier — Service Worker
// Provides offline support by caching the app shell.

const CACHE = 'sma-v1'
const OFFLINE_URL = '/'

const SHELL = [
  '/',
  '/index.html',
  '/hero-light.png',
  '/hero-dark.png',
  '/logo.png',
  '/founder.png',
  '/founder-sheet.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(SHELL))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Remove old caches
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached
      return fetch(event.request).catch(() =>
        // If offline and fetching navigation, serve the app shell
        event.request.destination === 'document'
          ? caches.match(OFFLINE_URL)
          : Response.error()
      )
    })
  )
})
