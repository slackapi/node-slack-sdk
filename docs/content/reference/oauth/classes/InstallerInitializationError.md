# Class: InstallerInitializationError

## Extends

- `Error`

## Implements

- [`CodedError`](../interfaces/CodedError.md)

## Constructors

### new InstallerInitializationError()

```ts
new InstallerInitializationError(message?): InstallerInitializationError
```

#### Parameters

• **message?**: `string`

#### Returns

[`InstallerInitializationError`](InstallerInitializationError.md)

#### Inherited from

`Error.constructor`

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1082

## Properties

### code

```ts
code: ErrorCode = ErrorCode.InstallerInitializationError;
```

#### Implementation of

[`CodedError`](../interfaces/CodedError.md).[`code`](../interfaces/CodedError.md#code)

#### Defined in

[packages/oauth/src/errors.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/errors.ts#L19)

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
