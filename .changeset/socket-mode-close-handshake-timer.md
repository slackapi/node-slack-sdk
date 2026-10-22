---
"@slack/socket-mode": patch
---

Fix an orphaned close-handshake timer ([#2771](https://github.com/slackapi/node-slack-sdk/issues/2771)). When the connection closed while a close frame was in flight, the 30s timer armed by `disconnect()` outlived the connection, then logged a false "Peer did not complete the close handshake" warning and emitted a second `close`, which could start a duplicate reconnect.

- `disconnect()` on an already closed socket now cleans up immediately instead of sending a close frame and arming a second timer. This is the path when Slack drops the TCP connection after a `disconnect` message.
- `disconnect()` before the connection opens no longer leaves the timer behind: undici fails a connecting socket synchronously inside `close()`, so the timer is now armed before it.
