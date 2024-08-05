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

[packages/socket-mode/src/errors.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/errors.ts#L20)
