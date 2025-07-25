[@slack/web-api](../index.md) / WorkflowsStepFailedArguments

# Interface: WorkflowsStepFailedArguments

Defined in: [src/types/request/workflows.ts:60](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L60)

## Extends

- `TokenOverridable`

## Properties

### error

```ts
error: object;
```

Defined in: [src/types/request/workflows.ts:62](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L62)

#### message

```ts
message: string;
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

***

### workflow\_step\_execute\_id

```ts
workflow_step_execute_id: string;
```

Defined in: [src/types/request/workflows.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/workflows.ts#L61)
