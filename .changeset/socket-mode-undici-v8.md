---
"@slack/socket-mode": minor
---

Support `undici@^8` as a peer dependency in addition to `undici@^7`. `undici@^8` requires Node.js >=22.19; `undici@^7` continues to support Node.js >=20.

The default dispatcher now pins the WebSocket connection to HTTP/1.1, since `undici@^8` offers HTTP/2 by default. To do the same with a custom `ProxyAgent` dispatcher, pass `requestTls: { allowH2: false }`.
