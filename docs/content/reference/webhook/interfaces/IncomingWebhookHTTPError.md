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

[errors.ts:26](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/webhook/src/errors.ts#L26)

***

### original

```ts
original: Error;
```

#### Defined in

[errors.ts:27](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/webhook/src/errors.ts#L27)
