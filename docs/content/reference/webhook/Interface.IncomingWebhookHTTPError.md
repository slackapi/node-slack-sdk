# Interface: IncomingWebhookHTTPError

All errors produced by this package adhere to this interface

## Extends

- [`CodedError`](Interface.CodedError.md)

## Properties

### code

```ts
code: HTTPError;
```

#### Overrides

[`CodedError`](Interface.CodedError.md).[`code`](Interface.CodedError.md#code)

#### Defined in

[errors.ts:26](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/errors.ts#L26)

***

### original

```ts
original: Error;
```

#### Defined in

[errors.ts:27](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/errors.ts#L27)
