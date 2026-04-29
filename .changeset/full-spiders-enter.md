---
"@slack/socket-mode": patch
---

fix: terminate closing connections earlier if normal close responses fail

If Slack doesn't respond to a close frame, the WebSocket connection is now force-terminated instead of waiting for a response that won't arrive. Since [disconnects are expected](https://docs.slack.dev/apis/events-api/using-socket-mode/#disconnect) every few hours, this avoids repeated "pong wasn't received" warnings and speeds up reconnection.
