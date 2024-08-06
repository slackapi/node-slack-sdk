# Interface: IncomingWebhookRequestError

All errors produced by this package adhere to this interface

## Extends

- [`CodedError`](Interface.CodedError.md)

## Properties

### code

```ts
code: RequestError;
```

#### Overrides

[`CodedError`](Interface.CodedError.md).[`code`](Interface.CodedError.md#code)

#### Defined in

[errors.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/errors.ts#L21)

***

### original

```ts
original: Error;
```

#### Defined in

[errors.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/errors.ts#L22)
