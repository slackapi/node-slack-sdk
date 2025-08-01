[@slack/web-api](../index.md) / FunctionsCompleteSuccessArguments

# Interface: FunctionsCompleteSuccessArguments

Defined in: [src/types/request/functions.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/functions.ts#L13)

## Extends

- `ExecutionID`.`TokenOverridable`

## Properties

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

### outputs

```ts
outputs: Record<string, unknown>;
```

Defined in: [src/types/request/functions.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/functions.ts#L14)

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
