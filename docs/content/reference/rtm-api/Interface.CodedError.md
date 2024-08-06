# Interface: CodedError

All errors produced by this package adhere to this interface

## Extends

- `ErrnoException`

## Extended by

- [`RTMPlatformError`](Interface.RTMPlatformError.md)
- [`RTMWebsocketError`](Interface.RTMWebsocketError.md)
- [`RTMNoReplyReceivedError`](Interface.RTMNoReplyReceivedError.md)
- [`RTMSendWhileDisconnectedError`](Interface.RTMSendWhileDisconnectedError.md)
- [`RTMSendWhileNotReadyError`](Interface.RTMSendWhileNotReadyError.md)

## Properties

### code

```ts
code: ErrorCode;
```

#### Defined in

[errors.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/errors.ts#L7)
