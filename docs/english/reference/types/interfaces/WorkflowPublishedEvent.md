[@slack/types](../index.md) / WorkflowPublishedEvent

# Interface: WorkflowPublishedEvent

Defined in: [events/steps-from-apps.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L15)

## Properties

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/steps-from-apps.ts:26](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L26)

***

### type

```ts
type: "workflow_published";
```

Defined in: [events/steps-from-apps.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L16)

***

### workflow\_id

```ts
workflow_id: string;
```

Defined in: [events/steps-from-apps.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L17)

***

### workflow\_published\_configuration

```ts
workflow_published_configuration: object;
```

Defined in: [events/steps-from-apps.ts:18](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/steps-from-apps.ts#L18)

#### app\_steps

```ts
app_steps: object[];
```

#### version\_id

```ts
version_id: string;
```
