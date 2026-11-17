---
"@slack/webhook": patch
---

fix: stop `IncomingWebhook.send()` from posting the `timeout` and `retryConfig` options

These options were already removed from the constructor defaults, but options given to `send()` were merged in afterward and posted in the payload. They're now removed from every payload before it's sent.
