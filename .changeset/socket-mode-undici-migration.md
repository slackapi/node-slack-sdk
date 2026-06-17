---
"@slack/socket-mode": major
---

Replaced the `ws` WebSocket library with a spec-compliant WebSocket implementation backed by `undici`. **`undici@^7` is now a peer dependency** that must be installed alongside `@slack/socket-mode`:

```bash
npm install @slack/socket-mode undici@^7
```

**Removed options:**
- **`clientOptions.agent`** (the `httpAgent` passed to the underlying web-api client). Use the new top-level `dispatcher` option instead. The dispatcher handles both the WebSocket connection and HTTP API calls (unless `clientOptions.fetch` is also provided, in which case `dispatcher` only applies to WebSocket).

**New `dispatcher` option:**
```js
import { SocketModeClient } from '@slack/socket-mode';
import { ProxyAgent } from 'undici';

const client = new SocketModeClient({
  appToken: process.env.SLACK_APP_TOKEN,
  dispatcher: new ProxyAgent('http://proxy:3128'),
});
```

For simple proxy use cases, prefer the Node.js built-in proxy support: call `http.setGlobalProxyFromEnv()` at startup or set `NODE_USE_ENV_PROXY=1` (Node.js 24+) with `HTTP_PROXY`/`HTTPS_PROXY` environment variables.

The `dispatcher` option accepts any object implementing the `SocketModeDispatcher` interface (structurally compatible with undici's `Agent`, `ProxyAgent`, `Client`, etc.).

This package now depends on `@slack/web-api@^8` — any `clientOptions` you pass are subject to web-api v8 breaking changes (e.g., the `agent` and `tls` options are no longer available; use `clientOptions.fetch` instead).
