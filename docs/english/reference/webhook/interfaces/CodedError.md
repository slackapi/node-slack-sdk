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
cause?: unknown;
```

Defined in: node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

`NodeJS.ErrnoException.cause`

***

### ~~code~~

```ts
code: ErrorCode;
```

Defined in: [packages/webhook/src/errors.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/webhook/src/errors.ts#L5)

#### Overrides

`NodeJS.ErrnoException.code`

***

### ~~errno?~~

```ts
errno?: number;
```

Defined in: packages/webhook/node\_modules/@types/node/globals.d.ts:101

#### Inherited from

`NodeJS.ErrnoException.errno`

***

### ~~message~~

```ts
message: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`NodeJS.ErrnoException.message`

***

### ~~name~~

```ts
name: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`NodeJS.ErrnoException.name`

***

### ~~path?~~

```ts
path?: string;
```

Defined in: packages/webhook/node\_modules/@types/node/globals.d.ts:103

#### Inherited from

`NodeJS.ErrnoException.path`

***

### ~~stack?~~

```ts
stack?: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`NodeJS.ErrnoException.stack`

***

### ~~syscall?~~

```ts
syscall?: string;
```

Defined in: packages/webhook/node\_modules/@types/node/globals.d.ts:104

#### Inherited from

`NodeJS.ErrnoException.syscall`
