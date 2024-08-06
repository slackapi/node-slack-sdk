# Class: UnknownError

## Extends

- `Error`

## Implements

- [`CodedError`](Interface.CodedError.md)

## Constructors

### new UnknownError()

```ts
new UnknownError(message?): UnknownError
```

#### Parameters

• **message?**: `string`

#### Returns

[`UnknownError`](Class.UnknownError.md)

#### Inherited from

`Error.constructor`

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1082

## Properties

### code

```ts
code: ErrorCode = ErrorCode.UnknownError;
```

#### Implementation of

[`CodedError`](Interface.CodedError.md).[`code`](Interface.CodedError.md#code)

#### Defined in

[packages/oauth/src/errors.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/errors.ts#L37)

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
