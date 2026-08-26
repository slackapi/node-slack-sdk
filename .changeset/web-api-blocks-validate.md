---
"@slack/web-api": minor
---

Added the `blocks.validate` method. Call it as `client.blocks.validate({ blocks })` to validate a Block Kit payload against the Block Kit schema — `blocks` (a `(KnownBlock | Block)[]`), `message` (`{ blocks, attachments }`), or `view` (a `View`) — instead of the untyped `client.apiCall('blocks.validate', …)` escape hatch. The response's `errors[]` carry each failure's `pointer`, `code`, `message`, and `constraint`.
