---
"@slack/socket-mode": patch
---

Fix leaked TCP sockets on disconnect ([#2709](https://github.com/slackapi/node-slack-sdk/issues/2709)). Moving from `ws` to undici's `WebSocket` in 3.0.0 dropped every force-close mechanism, so `ESTABLISHED` sockets were never torn down and accumulated toward Slack's per-app connection cap.

- `disconnect()` now arms a 30s close-handshake timeout, so a peer that never replies to the close frame no longer leaves the socket stuck in `CLOSING` indefinitely.
- On the default dispatcher path, the underlying TCP socket is now captured and force-destroyed during cleanup. A user-supplied `dispatcher` owns its own socket and instead relies on the close-handshake timeout — this limitation is documented on the `dispatcher` option.
- The `close` handler no longer schedules a reconnect on stale or overlapping close events, so at most one reconnect is scheduled per disconnect.
