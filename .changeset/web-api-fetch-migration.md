---
"@slack/web-api": major
---

Replaced `axios` with the standard Fetch API for all HTTP transport. The following options and types have been removed from `WebClientOptions`:

- **`agent`** — Use the new `fetch` option to provide a custom fetch implementation with proxy or keep-alive support. For proxies, prefer the built-in `http.setGlobalProxyFromEnv()` or `NODE_USE_ENV_PROXY=1` (Node.js 24+). For advanced use cases:
  ```ts
  import { fetch, Agent } from 'undici';
  const client = new WebClient(token, {
    fetch: (url, init) => fetch(url, { ...init, dispatcher: new Agent({ keepAliveTimeout: 60_000 }) }),
  });
  ```
- **`tls`** and **`TLSOptions`** — Configure TLS via a custom `fetch` implementation with an undici `Agent`, or use the `NODE_EXTRA_CA_CERTS` environment variable.
- **`requestInterceptor`** and **`RequestInterceptor`** type — Wrap the `fetch` function to intercept or modify requests before they are sent.
- **`adapter`** and **`AdapterConfig`** type — Use the `fetch` option instead.
- **`RequestConfig`** type (was an alias for Axios' `InternalAxiosRequestConfig`) — Removed entirely.
- **`attachOriginalToWebAPIRequestError`** option — Removed. The original error is now always available via the standard `cause` property on `WebAPIRequestError`.

The dependencies `axios`, `form-data`, `is-electron`, and `is-stream` have been removed. The default `fetch` implementation is `globalThis.fetch` (available in Node.js 20+).

New exported types for custom fetch implementations: `FetchFunction`, `FetchResponse`, `FetchRequestInit`, `FetchHeaders`.
