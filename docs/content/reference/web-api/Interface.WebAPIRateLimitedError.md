# Interface: WebAPIRateLimitedError

All errors produced by this package adhere to this interface

## Extends

- [`CodedError`](Interface.CodedError.md)

## Properties

### code

```ts
code: RateLimitedError;
```

#### Overrides

[`CodedError`](Interface.CodedError.md).[`code`](Interface.CodedError.md#code)

#### Defined in

[packages/web-api/src/errors.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/errors.ts#L61)

***

### errno?

```ts
optional errno: number;
```

#### Inherited from

[`CodedError`](Interface.CodedError.md).[`errno`](Interface.CodedError.md#errno)

#### Defined in

packages/web-api/node\_modules/@types/node/globals.d.ts:268

***

### message

```ts
message: string;
```

#### Inherited from

[`CodedError`](Interface.CodedError.md).[`message`](Interface.CodedError.md#message)

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

```ts
name: string;
```

#### Inherited from

[`CodedError`](Interface.CodedError.md).[`name`](Interface.CodedError.md#name)

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### path?

```ts
optional path: string;
```

#### Inherited from

[`CodedError`](Interface.CodedError.md).[`path`](Interface.CodedError.md#path)

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

[`CodedError`](Interface.CodedError.md).[`stack`](Interface.CodedError.md#stack)

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### syscall?

```ts
optional syscall: string;
```

#### Inherited from

[`CodedError`](Interface.CodedError.md).[`syscall`](Interface.CodedError.md#syscall)

#### Defined in

packages/web-api/node\_modules/@types/node/globals.d.ts:271
