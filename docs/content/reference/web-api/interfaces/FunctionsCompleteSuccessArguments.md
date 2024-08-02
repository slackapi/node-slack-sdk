# Interface: FunctionsCompleteSuccessArguments

## Extends

- `ExecutionID`.`TokenOverridable`

## Properties

### function\_execution\_id

```ts
function_execution_id: string;
```

#### Inherited from

`ExecutionID.function_execution_id`

#### Defined in

[packages/web-api/src/types/request/functions.ts:4](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/functions.ts#L4)

***

### outputs

```ts
outputs: Record<string, unknown>;
```

#### Defined in

[packages/web-api/src/types/request/functions.ts:14](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/functions.ts#L14)

***

### token?

```ts
optional token: string;
```

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`

#### Defined in

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L43)
