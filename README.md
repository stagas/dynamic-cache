<h1 align="center">dynamic-cache</h1>

<p align="center">
service worker where cache can be updated dynamically at runtime
</p>

<p align="center">
   <a href="#install">        馃敡 <strong>Install</strong></a>
 路 <a href="#example">        馃З <strong>Example</strong></a>
 路 <a href="#api">            馃摐 <strong>API docs</strong></a>
 路 <a href="https://github.com/stagas/dynamic-cache/releases"> 馃敟 <strong>Releases</strong></a>
 路 <a href="#contribute">     馃挭馃徏 <strong>Contribute</strong></a>
 路 <a href="https://github.com/stagas/dynamic-cache/issues">   馃枑锔? <strong>Help</strong></a>
</p>

***

## Install

```sh
$ npm i dynamic-cache
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [constructor](#constructor)
    *   [Parameters](#parameters)
*   [put](#put)
    *   [Parameters](#parameters-1)
*   [register](#register)
    *   [Parameters](#parameters-2)

### constructor

[src/index.ts:58-62](https://github.com/stagas/dynamic-cache/blob/5e8db09ee99c5bf4074e23bc2ad2734c07be9803/src/index.ts#L58-L62 "Source code on GitHub")

Creates a DynamicCache.

```ts
const headers = new Headers({ 'Content-Type': 'text/plain' })
const cache = new DynamicCache('text', headers)
```

#### Parameters

*   `namespace` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Namespace of the files in this cache
*   `headers` **[Headers](https://developer.mozilla.org/docs/Web/HTML/Element/header)** Headers to use for this cache files

### put

[src/index.ts:77-84](https://github.com/stagas/dynamic-cache/blob/5e8db09ee99c5bf4074e23bc2ad2734c07be9803/src/index.ts#L77-L84 "Source code on GitHub")

Puts a file in the cache.

```ts
const url = await cache.put('foo', 'bar')
await fetch(url).then(res => res.text()) // => "bar"
```

#### Parameters

*   `filename` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The filename of the resource
*   `content` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The content of the resource
*   `headers`  Headers to be used&#x20;(optional, default `this.headers`)

Returns **any** The full path of the resource, including the cache's prefix

### register

[src/index.ts:21-41](https://github.com/stagas/dynamic-cache/blob/5e8db09ee99c5bf4074e23bc2ad2734c07be9803/src/index.ts#L21-L41 "Source code on GitHub")

Registers the service worker.

```ts
// note you must serve `sw.js` at a higher level than your current url location
await DynamicCache.register('/sw.js')
```

#### Parameters

*   `url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The url of the service worker file (can find it under `dist/cjs/sw.js` or `dist/esm/sw.js`)
*   `options` **RegistrationOptions** Service worker registration options (@see <https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration>)&#x20;(optional, default `{scope:'/'}`)

## Contribute

[Fork](https://github.com/stagas/dynamic-cache/fork) or
[edit](https://github.dev/stagas/dynamic-cache) and submit a PR.

All contributions are welcome!

## License

MIT 漏 2021
[stagas](https://github.com/stagas)
