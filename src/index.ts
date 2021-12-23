import { PREFIX } from './constants'

export class DynamicCache {
  static async cleanup() {
    const cacheKeys = await window.caches.keys()
    await Promise.all(cacheKeys.filter(key => key.startsWith(PREFIX)).map(key => window.caches.delete(key)))
  }

  /**
   * Registers the service worker.
   *
   * ```ts
   * // note you must serve `sw.js` at a higher level than your current url location
   * await DynamicCache.register('/sw.js')
   * ```
   *
   * @param url The url of the service worker file (can find it under `dist/cjs/sw.js` or `dist/esm/sw.js`)
   * @param options Service worker registration options (@see https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration)
   * @returns
   */
  static async register(url: string, options: RegistrationOptions = { scope: '/' }) {
    await DynamicCache.cleanup()

    const reg = await navigator.serviceWorker.register(url, options)
    if (reg.active) return reg.active

    const promise = new Promise(resolve => {
      reg.onupdatefound = () => {
        if (reg.installing)
          reg.installing.onstatechange = event => {
            if ((event as Event & { target: ServiceWorker }).target.state === 'activated') {
              resolve(event.target)
            }
          }
      }
    })

    reg.update()

    return promise
  }

  namespace: string
  headers: Headers
  path: string

  /**
   * Creates a DynamicCache.
   *
   * ```ts
   * const headers = new Headers({ 'Content-Type': 'text/plain' })
   * const cache = new DynamicCache('text', headers)
   * ```
   *
   * @param namespace Namespace of the files in this cache
   * @param headers Headers to use for this cache files
   */
  constructor(namespace: string, headers: Headers) {
    this.namespace = namespace
    this.headers = headers
    this.path = PREFIX + this.namespace
  }

  /**
   * Puts a file in the cache.
   *
   * ```ts
   * const url = await cache.put('foo', 'bar')
   * await fetch(url).then(res => res.text()) // => "bar"
   * ```

   * @param filename The filename of the resource
   * @param content The content of the resource
   * @param headers Headers to be used
   * @returns The full path of the resource, including the cache's prefix
   */
  async put(filename: string, content: string, headers = this.headers) {
    filename = `/${this.path}/${filename}`
    const req = new Request(filename, { method: 'GET', headers })
    const res = new Response(content, { status: 200, headers })
    const cache = await caches.open(this.path)
    await cache.put(req, res)
    return filename
  }
}
