[@slack/types](../index.md) / WorkflowStepExecuteEvent

# Interface: WorkflowStepExecuteEvent

Defined in: [events/steps-from-apps.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L65)

## Properties

### callback\_id

```ts
callback_id: string;
```

Defined in: [events/steps-from-apps.ts:67](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L67)

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/steps-from-apps.ts:85](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L85)

***

### type

```ts
type: "workflow_step_execute";
```

Defined in: [events/steps-from-apps.ts:66](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L66)

***

### workflow\_step

```ts
workflow_step: object;
```

Defined in: [events/steps-from-apps.ts:68](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L68)

#### inputs

```ts
inputs: object;
```

##### Index Signature

```ts
[key: string]: object
```

#### outputs

```ts
outputs: object[];
```

#### step\_id

```ts
step_id: string;
```

#### workflow\_id

```ts
workflow_id: string;
```

#### workflow\_instance\_id

```ts
workflow_instance_id: string;
```

#### workflow\_step\_execute\_id

```ts
workflow_step_execute_id: string;
```
