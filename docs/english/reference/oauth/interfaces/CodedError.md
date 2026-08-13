[@slack/oauth](../index.md) / CodedError

# Interface: CodedError

Defined in: [packages/oauth/src/errors.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/errors.ts#L8)

All errors produced by this package adhere to this interface.

NOTE: This interface is retained because it is part of the public `CallbackOptions#failure`
callback signature. For new code, prefer `instanceof` checks against the [SlackOAuthError](../classes/SlackOAuthError.md)
base class or a specific error subclass.

## Extends

- `Error`

## Properties

### cause?

```ts
optional cause: unknown;
```

Defined in: node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

```ts
Error.cause
```

***

### code

```ts
code: string;
```

Defined in: [packages/oauth/src/errors.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/errors.ts#L9)

***

### message

```ts
message: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

```ts
Error.message
```

***

### name

```ts
name: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

```ts
Error.name
```

***

### stack?

```ts
optional stack: string;
```

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

```ts
Error.stack
```
