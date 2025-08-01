[@slack/types](../index.md) / WorkflowStepDeletedEvent

# Interface: WorkflowStepDeletedEvent

Defined in: [events/steps-from-apps.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L43)

## Properties

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/steps-from-apps.ts:62](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L62)

***

### type

```ts
type: "workflow_step_deleted";
```

Defined in: [events/steps-from-apps.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L44)

***

### workflow\_draft\_configuration

```ts
workflow_draft_configuration: object;
```

Defined in: [events/steps-from-apps.ts:46](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L46)

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

Defined in: [events/steps-from-apps.ts:45](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L45)

***

### workflow\_published\_configuration?

```ts
optional workflow_published_configuration: object;
```

Defined in: [events/steps-from-apps.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L54)

#### app\_steps

```ts
app_steps: object[];
```

#### version\_id

```ts
version_id: string;
```
