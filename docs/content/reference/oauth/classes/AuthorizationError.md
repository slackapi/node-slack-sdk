# Class: AuthorizationError

## Extends

- `Error`

## Implements

- [`CodedError`](../interfaces/CodedError.md)

## Constructors

### new AuthorizationError()

```ts
new AuthorizationError(message, original?): AuthorizationError
```

#### Parameters

• **message**: `string`

• **original?**: `Error`

#### Returns

[`AuthorizationError`](AuthorizationError.md)

#### Overrides

`Error.constructor`

#### Defined in

[packages/oauth/src/errors.ts:45](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/oauth/src/errors.ts#L45)

## Properties

### code

```ts
code: ErrorCode = ErrorCode.AuthorizationError;
```

#### Implementation of

[`CodedError`](../interfaces/CodedError.md).[`code`](../interfaces/CodedError.md#code)

#### Defined in

[packages/oauth/src/errors.ts:41](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/oauth/src/errors.ts#L41)

***

### message

```ts
message: string;
```

#### Implementation of

[`CodedError`](../interfaces/CodedError.md).[`message`](../interfaces/CodedError.md#message)

#### Inherited from

`Error.message`

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

```ts
name: string;
```

#### Implementation of

[`CodedError`](../interfaces/CodedError.md).[`name`](../interfaces/CodedError.md#name)

#### Inherited from

`Error.name`

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### original

```ts
original: undefined | Error;
```

#### Defined in

[packages/oauth/src/errors.ts:43](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/oauth/src/errors.ts#L43)

***

### stack?

```ts
optional stack: string;
```

#### Implementation of

[`CodedError`](../interfaces/CodedError.md).[`stack`](../interfaces/CodedError.md#stack)

#### Inherited from

`Error.stack`

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1078
