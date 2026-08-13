---
"@slack/web-api": minor
---

Added the `blocks.validate` method. Call it as `client.blocks.validate({ blocks })` to validate a Block Kit payload (`blocks`, `message`, or `view`, each a JSON-encoded string) against the Block Kit schema, instead of the untyped `client.apiCall('blocks.validate', …)` escape hatch.
