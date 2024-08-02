# Interface: IncomingWebhookHTTPError

All errors produced by this package adhere to this interface

## Extends

- [`CodedError`](CodedError.md)

## Properties

### code

```ts
code: HTTPError;
```

#### Overrides

[`CodedError`](CodedError.md).[`code`](CodedError.md#code)

#### Defined in

[errors.ts:26](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/webhook/src/errors.ts#L26)

***

### original

```ts
original: Error;
```

#### Defined in

[errors.ts:27](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/webhook/src/errors.ts#L27)
