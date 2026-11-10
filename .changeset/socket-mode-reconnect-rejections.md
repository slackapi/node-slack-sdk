---
"@slack/socket-mode": minor
---

Fix an unhandled promise rejection of `undefined` that could crash the process when `disconnect()` raced a pending automatic reconnect ([#2656](https://github.com/slackapi/node-slack-sdk/issues/2656)). A reconnect that fails for good still rejects as before, with its cause.

Also, `disconnect()` called before `start()` finishes connecting (while fetching the WebSocket URL, waiting to retry it, or during the WebSocket handshake) no longer leaves a connection opening afterwards: `start()` rejects with the new `SMConnectAbortedError` instead of hanging or rejecting with `undefined`.

Calling `start()` right after `disconnect()`, while a reconnect is waiting or fetching its URL, now opens one connection instead of two.
