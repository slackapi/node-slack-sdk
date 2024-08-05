# Type Alias: SMCallError

```ts
type SMCallError: 
  | SMPlatformError
  | SMWebsocketError
  | SMNoReplyReceivedError
  | SMSendWhileDisconnectedError
  | SMSendWhileNotReadyError;
```

## Defined in

[packages/socket-mode/src/errors.ts:20](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/socket-mode/src/errors.ts#L20)
