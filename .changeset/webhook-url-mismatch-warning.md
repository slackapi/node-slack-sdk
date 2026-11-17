---
"@slack/webhook": minor
---

feat: warn when a URL pattern mismatches the webhook class

`IncomingWebhook` and `WebhookTrigger` now accept optional `logger` and `logLevel` options. On construction, `IncomingWebhook` warns when the URL contains `/triggers/` and `WebhookTrigger` warns when the URL contains `/services/`, so a URL used with the wrong class shows up in the logs before anything is sent.
