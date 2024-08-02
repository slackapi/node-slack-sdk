# Interface: WorkflowsStepCompletedArguments

## Extends

- `TokenOverridable`

## Properties

### outputs?

```ts
optional outputs: Record<string, unknown>;
```

#### Defined in

[packages/web-api/src/types/request/workflows.ts:9](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/workflows.ts#L9)

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

***

### workflow\_step\_execute\_id

```ts
workflow_step_execute_id: string;
```

#### Defined in

[packages/web-api/src/types/request/workflows.ts:8](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/workflows.ts#L8)
