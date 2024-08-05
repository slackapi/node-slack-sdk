# Interface: CodedError

All errors produced by this package adhere to this interface

## Extends

- `ErrnoException`

## Extended by

- [`WebAPIPlatformError`](WebAPIPlatformError.md)
- [`WebAPIRequestError`](WebAPIRequestError.md)
- [`WebAPIHTTPError`](WebAPIHTTPError.md)
- [`WebAPIRateLimitedError`](WebAPIRateLimitedError.md)

## Properties

### code

```ts
code: ErrorCode;
```

#### Overrides

`NodeJS.ErrnoException.code`

#### Defined in

[packages/web-api/src/errors.ts:11](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/errors.ts#L11)

***

### errno?

```ts
optional errno: number;
```

#### Inherited from

`NodeJS.ErrnoException.errno`

#### Defined in

packages/web-api/node\_modules/@types/node/globals.d.ts:268

***

### message

```ts
message: string;
```

#### Inherited from

`NodeJS.ErrnoException.message`

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

```ts
name: string;
```

#### Inherited from

`NodeJS.ErrnoException.name`

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### path?

```ts
optional path: string;
```

#### Inherited from

`NodeJS.ErrnoException.path`

#### Defined in

packages/web-api/node\_modules/@types/node/globals.d.ts:270

***

### stack?

```ts
optional stack: string;
```

#### Inherited from

`NodeJS.ErrnoException.stack`

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### syscall?

```ts
optional syscall: string;
```

#### Inherited from

`NodeJS.ErrnoException.syscall`

#### Defined in

packages/web-api/node\_modules/@types/node/globals.d.ts:271
