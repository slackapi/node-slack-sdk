# Class: AuthorizationError

## Extends

- `Error`

## Implements

- [`CodedError`](Interface.CodedError.md)

## Constructors

### new AuthorizationError()

```ts
new AuthorizationError(message, original?): AuthorizationError
```

#### Parameters

• **message**: `string`

• **original?**: `Error`

#### Returns

[`AuthorizationError`](Class.AuthorizationError.md)

#### Overrides

`Error.constructor`

#### Defined in

[packages/oauth/src/errors.ts:45](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/errors.ts#L45)

## Properties

### code

```ts
code: ErrorCode = ErrorCode.AuthorizationError;
```

#### Implementation of

[`CodedError`](Interface.CodedError.md).[`code`](Interface.CodedError.md#code)

#### Defined in

[packages/oauth/src/errors.ts:41](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/errors.ts#L41)

***

### message

```ts
message: string;
```

#### Implementation of

[`CodedError`](Interface.CodedError.md).[`message`](Interface.CodedError.md#message)

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

[`CodedError`](Interface.CodedError.md).[`name`](Interface.CodedError.md#name)

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

[packages/oauth/src/errors.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/errors.ts#L43)

***

### stack?

```ts
optional stack: string;
```

#### Implementation of

[`CodedError`](Interface.CodedError.md).[`stack`](Interface.CodedError.md#stack)

#### Inherited from

`Error.stack`

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1078
