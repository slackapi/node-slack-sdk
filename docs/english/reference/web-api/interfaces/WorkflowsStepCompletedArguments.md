[@slack/web-api](../index.md) / WorkflowsStepCompletedArguments

# Interface: WorkflowsStepCompletedArguments

Defined in: [src/types/request/workflows.ts:55](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L55)

## Extends

- `TokenOverridable`

## Properties

### outputs?

```ts
optional outputs: Record<string, unknown>;
```

Defined in: [src/types/request/workflows.ts:57](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L57)

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

***

### workflow\_step\_execute\_id

```ts
workflow_step_execute_id: string;
```

Defined in: [src/types/request/workflows.ts:56](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L56)
