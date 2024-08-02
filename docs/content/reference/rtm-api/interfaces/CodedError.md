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

[errors.ts:7](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/rtm-api/src/errors.ts#L7)
