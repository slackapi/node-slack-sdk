[@slack/web-api](../index.md) / WorkflowStepDeletedEvent

# Interface: WorkflowStepDeletedEvent

Defined in: node\_modules/@slack/types/dist/events/steps-from-apps.d.ts:40

## Properties

### event\_ts

```ts
event_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/steps-from-apps.d.ts:59

***

### type

```ts
type: "workflow_step_deleted";
```

Defined in: node\_modules/@slack/types/dist/events/steps-from-apps.d.ts:41

***

### workflow\_draft\_configuration

```ts
workflow_draft_configuration: object;
```

Defined in: node\_modules/@slack/types/dist/events/steps-from-apps.d.ts:43

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

Defined in: node\_modules/@slack/types/dist/events/steps-from-apps.d.ts:42

***

### workflow\_published\_configuration?

```ts
optional workflow_published_configuration: object;
```

Defined in: node\_modules/@slack/types/dist/events/steps-from-apps.d.ts:51

#### app\_steps

```ts
app_steps: object[];
```

#### version\_id

```ts
version_id: string;
```
