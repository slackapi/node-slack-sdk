---
"@slack/socket-mode": patch
---

Fix a crash on `events_api` messages without an inner event ([#2167](https://github.com/slackapi/node-slack-sdk/issues/2167)). Slack sends `app_rate_limited` notifications this way, and the client threw `Cannot read properties of undefined (reading 'type')`. These messages are now emitted under their payload type, e.g. `app_rate_limited`.
