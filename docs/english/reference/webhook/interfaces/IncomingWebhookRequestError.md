[@slack/webhook](../index.md) / IncomingWebhookRequestError

# Interface: IncomingWebhookRequestError

Defined in: [src/errors.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/errors.ts#L20)

All errors produced by this package adhere to this interface

## Extends

- [`CodedError`](CodedError.md)

## Properties

### code

```ts
code: RequestError;
```

Defined in: [src/errors.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/errors.ts#L21)

#### Overrides

[`CodedError`](CodedError.md).[`code`](CodedError.md#code)

***

### errno?

```ts
optional errno: number;
```

Defined in: node\_modules/@types/node/globals.d.ts:196

#### Inherited from

[`CodedError`](CodedError.md).[`errno`](CodedError.md#errno)

***

### message

```ts
message: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

[`CodedError`](CodedError.md).[`message`](CodedError.md#message)

***

### name

```ts
name: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

[`CodedError`](CodedError.md).[`name`](CodedError.md#name)

***

### original

```ts
original: Error;
```

Defined in: [src/errors.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/errors.ts#L22)

***

### path?

```ts
optional path: string;
```

Defined in: node\_modules/@types/node/globals.d.ts:198

#### Inherited from

[`CodedError`](CodedError.md).[`path`](CodedError.md#path)

***

### stack?

```ts
optional stack: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

[`CodedError`](CodedError.md).[`stack`](CodedError.md#stack)

***

### syscall?

```ts
optional syscall: string;
```

Defined in: node\_modules/@types/node/globals.d.ts:199

#### Inherited from

[`CodedError`](CodedError.md).[`syscall`](CodedError.md#syscall)
