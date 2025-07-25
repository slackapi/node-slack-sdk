[@slack/web-api](../index.md) / CodedError

# Interface: CodedError

Defined in: [src/errors.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/errors.ts#L10)

All errors produced by this package adhere to this interface

## Extends

- `ErrnoException`

## Extended by

- [`WebAPIHTTPError`](WebAPIHTTPError.md)
- [`WebAPIPlatformError`](WebAPIPlatformError.md)
- [`WebAPIRateLimitedError`](WebAPIRateLimitedError.md)
- [`WebAPIRequestError`](WebAPIRequestError.md)

## Properties

### code

```ts
code: ErrorCode;
```

Defined in: [src/errors.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/errors.ts#L11)

#### Overrides

```ts
NodeJS.ErrnoException.code
```

***

### errno?

```ts
optional errno: number;
```

Defined in: node\_modules/@types/node/globals.d.ts:196

#### Inherited from

```ts
NodeJS.ErrnoException.errno
```

***

### message

```ts
message: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

```ts
NodeJS.ErrnoException.message
```

***

### name

```ts
name: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

```ts
NodeJS.ErrnoException.name
```

***

### path?

```ts
optional path: string;
```

Defined in: node\_modules/@types/node/globals.d.ts:198

#### Inherited from

```ts
NodeJS.ErrnoException.path
```

***

### stack?

```ts
optional stack: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

```ts
NodeJS.ErrnoException.stack
```

***

### syscall?

```ts
optional syscall: string;
```

Defined in: node\_modules/@types/node/globals.d.ts:199

#### Inherited from

```ts
NodeJS.ErrnoException.syscall
```
