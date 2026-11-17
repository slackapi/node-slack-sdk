---
"@slack/webhook": patch
---

fix: use the `timeout` and `retryConfig` given to `IncomingWebhook.send()`

`send()` accepted these options but only used the ones given to the constructor. Options given to `send()` now apply to that call, and fall back to the constructor's when left out.
