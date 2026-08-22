---
"@slack/webhook": minor
---

feat: add logger with URL mismatch warning

Both `IncomingWebhook` and `WebhookTrigger` now accept optional `logger` and `logLevel` options. On construction, each class warns if the provided URL appears to be intended for the other class (e.g. a `/triggers/` URL passed to `IncomingWebhook`), helping catch misconfiguration before it causes duplicate deliveries or hangs.
