---
"@slack/web-api": patch
---

fix: apply redact() to API response bodies in debug logs and recurse into nested objects, preventing tokens from leaking into logs when debug logging is enabled
