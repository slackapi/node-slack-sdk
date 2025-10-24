[@slack/web-api](../index.md) / WebAPIHTTPError

# Interface: WebAPIHTTPError

Defined in: [src/errors.ts:51](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/errors.ts#L51)

All errors produced by this package adhere to this interface

## Extends

- [`CodedError`](CodedError.md)

## Properties

### body?

```ts
optional body: any;
```

Defined in: [src/errors.ts:57](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/errors.ts#L57)

***

### code

```ts
code: HTTPError;
```

Defined in: [src/errors.ts:52](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/errors.ts#L52)

#### Overrides

[`CodedError`](CodedError.md).[`code`](CodedError.md#code)

***

### errno?

```ts
optional errno: number;
```

Defined in: node\_modules/@types/node/globals.d.ts:393

#### Inherited from

[`CodedError`](CodedError.md).[`errno`](CodedError.md#errno)

***

### headers

```ts
headers: IncomingHttpHeaders;
```

Defined in: [src/errors.ts:55](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/errors.ts#L55)

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

### path?

```ts
optional path: string;
```

Defined in: node\_modules/@types/node/globals.d.ts:395

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

### statusCode

```ts
statusCode: number;
```

Defined in: [src/errors.ts:53](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/errors.ts#L53)

***

### statusMessage

```ts
statusMessage: string;
```

Defined in: [src/errors.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/errors.ts#L54)

***

### syscall?

```ts
optional syscall: string;
```

Defined in: node\_modules/@types/node/globals.d.ts:396

#### Inherited from

[`CodedError`](CodedError.md).[`syscall`](CodedError.md#syscall)
