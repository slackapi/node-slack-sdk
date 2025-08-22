[@slack/web-api](../index.md) / FunctionsCompleteErrorArguments

# Interface: FunctionsCompleteErrorArguments

Defined in: [src/types/request/functions.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/functions.ts#L8)

## Extends

- `ExecutionID`.`TokenOverridable`

## Properties

### error

```ts
error: string;
```

Defined in: [src/types/request/functions.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/functions.ts#L9)

***

### function\_execution\_id

```ts
function_execution_id: string;
```

Defined in: [src/types/request/functions.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/functions.ts#L4)

#### Inherited from

```ts
ExecutionID.function_execution_id
```

***

### token?

```ts
optional token: string;
```

Defined in: [src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```
