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

[packages/socket-mode/src/errors.ts:20](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/socket-mode/src/errors.ts#L20)
