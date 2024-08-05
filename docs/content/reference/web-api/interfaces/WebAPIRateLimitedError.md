# Interface: WebAPIRateLimitedError

All errors produced by this package adhere to this interface

## Extends

- [`CodedError`](CodedError.md)

## Properties

### code

```ts
code: RateLimitedError;
```

#### Overrides

[`CodedError`](CodedError.md).[`code`](CodedError.md#code)

#### Defined in

[packages/web-api/src/errors.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/errors.ts#L61)

***

### errno?

```ts
optional errno: number;
```

#### Inherited from

[`CodedError`](CodedError.md).[`errno`](CodedError.md#errno)

#### Defined in

packages/web-api/node\_modules/@types/node/globals.d.ts:268

***

### message

```ts
message: string;
```

#### Inherited from

[`CodedError`](CodedError.md).[`message`](CodedError.md#message)

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

```ts
name: string;
```

#### Inherited from

[`CodedError`](CodedError.md).[`name`](CodedError.md#name)

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### path?

```ts
optional path: string;
```

#### Inherited from

[`CodedError`](CodedError.md).[`path`](CodedError.md#path)

#### Defined in

packages/web-api/node\_modules/@types/node/globals.d.ts:270

***

### retryAfter

```ts
retryAfter: number;
```

#### Defined in

[packages/web-api/src/errors.ts:62](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/errors.ts#L62)

***

### stack?

```ts
optional stack: string;
```

#### Inherited from

[`CodedError`](CodedError.md).[`stack`](CodedError.md#stack)

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### syscall?

```ts
optional syscall: string;
```

#### Inherited from

[`CodedError`](CodedError.md).[`syscall`](CodedError.md#syscall)

#### Defined in

packages/web-api/node\_modules/@types/node/globals.d.ts:271
