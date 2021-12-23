/// <reference lib="WebWorker" />

// export empty type because of tsc --isolatedModules flag
export type {}
declare const self: ServiceWorkerGlobalScope

import { PREFIX } from './constants'

self.skipWaiting()

self.addEventListener('activate', () => {
  self.clients.claim()
  self.registration.unregister()
})

self.addEventListener('fetch', event => {
  const pathname = new URL(event.request.url).pathname
  if (!pathname.startsWith('/' + PREFIX)) return

  event.respondWith(
    (async () => {
      const namespace = pathname.split('/' + PREFIX)[1].split('/')[0] // <prefix><namespace>/foo
      const cache = await caches.open(PREFIX + namespace)
      const response = await cache.match(event.request)
      return response ?? fetch(event.request, { mode: 'same-origin', cache: 'only-if-cached' })
    })()
  )
})
