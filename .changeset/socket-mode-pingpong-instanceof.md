---
"@slack/socket-mode": patch
---

fix(socket-mode): stop spurious ping/pong WARN from other undici WebSockets ([#2743](https://github.com/slackapi/node-slack-sdk/issues/2743)). Route diagnostics frames by reference identity instead of `instanceof`, which failed across undici copies (e.g. Node's global `WebSocket`).
