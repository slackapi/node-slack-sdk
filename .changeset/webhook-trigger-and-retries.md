---
"@slack/webhook": minor
---

feat: add `WebhookTrigger` class for Workflow Builder triggers and opt-in retries for `IncomingWebhook` and `WebhookTrigger`

`WebhookTrigger` surfaces its own `WebhookTriggerHTTPError` and `WebhookTriggerRequestError` (subclasses of `SlackWebhookError`), so trigger failures can be distinguished from `IncomingWebhook` failures via `instanceof`.
