---
"@slack/webhook": patch
---

fix: stop `WebhookTrigger.send()` from retrying after a successful delivery

A 2xx response with an empty or non-JSON body no longer throws. It now resolves to `{ ok: true }`. Before this fix that body threw a parse error, which was retried as a request error and caused duplicate Workflow Builder runs. A valid `{ ok: false, error }` body is still surfaced to the caller.
