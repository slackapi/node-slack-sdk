---
"@slack/socket-mode": patch
---

Fix `disconnect()` taking 5 seconds or more ([#2752](https://github.com/slackapi/node-slack-sdk/issues/2752)). Slack does not close the TCP connection after the close handshake, so `disconnect()` waited until the pong watchdog gave up and logged "A pong wasn't received". The close handshake now times out after 1 second, the heartbeat stops once the close frame is sent, and a close handshake started by Slack is cleaned up on the next heartbeat tick.
