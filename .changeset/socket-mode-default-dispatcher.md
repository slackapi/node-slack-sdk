---
"@slack/socket-mode": patch
---

chore(socket-mode): extract default dispatcher into `buildDefaultDispatcher()` and drop redundant Agent tracking

Internal refactor with no public API or behavior change. The inline undici `Agent` construction in `connect()` is lifted into a private `buildDefaultDispatcher()` helper, and the now-redundant `ownAgent` field and its `cleanup()` teardown are removed — undici already evicts and closes the pooled dispatcher at WebSocket upgrade, so the real teardown remains `defaultSocket.destroy()` (unchanged).
