---
"@slack/socket-mode": patch
---

Fix an unhandled promise rejection when an automatic reconnect fails ([#2656](https://github.com/slackapi/node-slack-sdk/issues/2656)), which could crash the process. The failure is now logged. Also, `disconnect()` called while the client is still waiting for `apps.connections.open` no longer leaves a connection opening afterwards: `start()` rejects with the new `SMDisconnectedWhileConnectingError` instead.
