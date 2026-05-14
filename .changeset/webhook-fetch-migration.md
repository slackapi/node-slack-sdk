---
"@slack/webhook": major
---

Replaced `axios` with the standard Fetch API for HTTP transport.

**Removed options from `IncomingWebhookDefaultArguments`:**
- **`agent`** — Use the new `fetch` option to provide a custom fetch implementation with proxy or TLS support. For proxies, prefer the built-in `http.setGlobalProxyFromEnv()` or `NODE_USE_ENV_PROXY=1` (Node.js 24+). For advanced use cases:
  ```ts
  import { fetch, Agent } from 'undici';
  const webhook = new IncomingWebhook(url, {
    fetch: (url, init) => fetch(url, { ...init, dispatcher: new Agent({ connect: { ca: myCA } }) }),
  });
  ```

The `axios` dependency has been removed. The default fetch implementation is `globalThis.fetch` (available in Node.js 20+). The `timeout` option remains available and is implemented via `AbortController`.
