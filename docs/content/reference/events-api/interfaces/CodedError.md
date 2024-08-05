# Interface: CodedError

All errors produced by this package are regular
[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) objects with
an extra [`error`](CodedError.md#code) field.

## Extends

- `Error`

## Properties

### code

```ts
code: ErrorCode;
```

What kind of error occurred.

#### Defined in

[packages/events-api/src/http-handler.ts:292](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/events-api/src/http-handler.ts#L292)

***

### message

```ts
message: string;
```

#### Inherited from

`Error.message`

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

```ts
name: string;
```

#### Inherited from

`Error.name`

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

```ts
optional stack: string;
```

#### Inherited from

`Error.stack`

#### Defined in

docs/node\_modules/typescript/lib/lib.es5.d.ts:1078
