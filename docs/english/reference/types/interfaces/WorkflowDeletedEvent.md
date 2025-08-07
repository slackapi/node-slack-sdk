[@slack/types](../index.md) / WorkflowDeletedEvent

# Interface: WorkflowDeletedEvent

Defined in: [events/steps-from-apps.ts:1](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L1)

## Properties

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/steps-from-apps.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L12)

***

### type

```ts
type: "workflow_deleted";
```

Defined in: [events/steps-from-apps.ts:2](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L2)

***

### workflow\_draft\_configuration

```ts
workflow_draft_configuration: object;
```

Defined in: [events/steps-from-apps.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L4)

#### app\_steps

```ts
app_steps: object[];
```

#### version\_id

```ts
version_id: string;
```

***

### workflow\_id

```ts
workflow_id: string;
```

Defined in: [events/steps-from-apps.ts:3](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L3)
