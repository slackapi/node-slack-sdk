# Interface: CodedError

All errors produced by this package adhere to this interface

## Extends

- `ErrnoException`

## Extended by

- [`RTMPlatformError`](RTMPlatformError.md)
- [`RTMWebsocketError`](RTMWebsocketError.md)
- [`RTMNoReplyReceivedError`](RTMNoReplyReceivedError.md)
- [`RTMSendWhileDisconnectedError`](RTMSendWhileDisconnectedError.md)
- [`RTMSendWhileNotReadyError`](RTMSendWhileNotReadyError.md)

## Properties

### code

```ts
code: ErrorCode;
```

#### Defined in

[errors.ts:7](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/rtm-api/src/errors.ts#L7)
