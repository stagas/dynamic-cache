import path from 'path'
import { runInClient } from 'run-in-client'
import { DynamicCache } from '..'

declare const window: WindowOrWorkerGlobalScope & { DynamicCache: typeof DynamicCache }

const setup = {
  root: path.resolve(path.join(__dirname, '..')),
  include: `
    import { DynamicCache } from './index.ts'
    window.DynamicCache = DynamicCache
  `,
}

describe('dynamic cache', () => {
  it('works', async () => {
    const result = await runInClient(setup, async () => {
      await window.DynamicCache.register('/sw.ts')
      const headers = new Headers({ 'Content-Type': 'text/plain' })
      const cache = new window.DynamicCache('text', headers)
      const url = await cache.put('foo', 'bar')
      const res = await fetch(url)
      return res.text()
    })

    expect(result).toEqual('bar')
  })

  it('can update multiple times', async () => {
    const result = await runInClient(setup, async () => {
      await window.DynamicCache.register('/sw.ts')
      const headers = new Headers({ 'Content-Type': 'text/plain' })
      const cache = new window.DynamicCache('text', headers)
      const url = await cache.put('foo', 'bar')
      const first = await fetch(url).then(res => res.text())
      await cache.put('foo', 'zoo')
      const second = await fetch(url).then(res => res.text())
      return [first, second]
    })

    expect(result).toEqual(['bar', 'zoo'])
  })
})
