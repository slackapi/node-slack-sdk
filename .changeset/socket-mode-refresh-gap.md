---
"@slack/socket-mode": patch
---

fix(socket-mode): reconnect immediately on Slack `disconnect` without a connection gap ([#2767](https://github.com/slackapi/node-slack-sdk/issues/2767)). If the replacement socket never receives `hello`, abort the refresh and recover with the usual reconnect backoff.
