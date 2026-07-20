[@slack/webhook](../index.md) / CodedError

# ~~Interface: CodedError~~

Defined in: [packages/webhook/src/errors.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/errors.ts#L4)

## Deprecated

Use `instanceof` checks with specific error classes (e.g. `IncomingWebhookRequestError`) or the `SlackWebhookError` base class instead.

## Extends

- `ErrnoException`

## Properties

### ~~cause?~~

```ts
optional cause: unknown;
```

Defined in: node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

```ts
NodeJS.ErrnoException.cause
```

***

### ~~code~~

```ts
code: ErrorCode;
```

Defined in: [packages/webhook/src/errors.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/errors.ts#L5)

#### Overrides

```ts
NodeJS.ErrnoException.code
```

***

### ~~errno?~~

```ts
optional errno: number;
```

Defined in: packages/webhook/node\_modules/@types/node/globals.d.ts:101

#### Inherited from

```ts
NodeJS.ErrnoException.errno
```

***

### ~~message~~

```ts
message: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

```ts
NodeJS.ErrnoException.message
```

***

### ~~name~~

```ts
name: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

```ts
NodeJS.ErrnoException.name
```

***

### ~~path?~~

```ts
optional path: string;
```

Defined in: packages/webhook/node\_modules/@types/node/globals.d.ts:103

#### Inherited from

```ts
NodeJS.ErrnoException.path
```

***

### ~~stack?~~

```ts
optional stack: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

```ts
NodeJS.ErrnoException.stack
```

***

### ~~syscall?~~

```ts
optional syscall: string;
```

Defined in: packages/webhook/node\_modules/@types/node/globals.d.ts:104

#### Inherited from

```ts
NodeJS.ErrnoException.syscall
```
