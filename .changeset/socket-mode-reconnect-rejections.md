---
"@slack/socket-mode": minor
---

Fix an unhandled promise rejection when an automatic reconnect fails ([#2656](https://github.com/slackapi/node-slack-sdk/issues/2656)), which could crash the process. The failure is now logged, and the client emits `disconnected` with the error so apps can react. The process no longer crashes: with nothing else keeping it alive it exits with code 0, otherwise it keeps running without a connection. To keep the old crash-and-restart behavior, exit on that event:

```js
client.on('disconnected', (error) => {
  if (error) process.exit(1);
});
```

In Bolt, the client is `receiver.client`.

Also, `disconnect()` called before `start()` finishes connecting (while fetching the WebSocket URL, waiting to retry it, or during the WebSocket handshake) no longer leaves a connection opening afterwards: `start()` rejects with the new `SMConnectAbortedError` instead of hanging or rejecting with `undefined`.
