---
"@slack/web-api": patch
---

Retry API calls whose response body is interrupted mid-read, as v7 did ([#2738](https://github.com/slackapi/node-slack-sdk/issues/2738)). A dropped connection or a `timeout` that fires while the body downloads now rejects with a `WebAPIRequestError` (with `code` and `original`) after the configured retries, instead of a raw `TypeError: terminated` with no retry.
