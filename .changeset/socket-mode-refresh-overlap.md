---
"@slack/socket-mode": patch
---

Fix a 5 to 12 second gap without a connection each time Slack refreshes a Socket Mode connection ([#2767](https://github.com/slackapi/node-slack-sdk/issues/2767)). On a `disconnect` message the client now opens the replacement connection right away, without a reconnect backoff, and keeps the current one acknowledging payloads until the replacement receives `hello`. Only then is the old connection closed.
