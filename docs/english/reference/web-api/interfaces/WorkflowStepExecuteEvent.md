[@slack/web-api](../index.md) / WorkflowStepExecuteEvent

# Interface: WorkflowStepExecuteEvent

Defined in: node\_modules/@slack/types/dist/events/steps-from-apps.d.ts:61

## Properties

### callback\_id

```ts
callback_id: string;
```

Defined in: node\_modules/@slack/types/dist/events/steps-from-apps.d.ts:63

***

### event\_ts

```ts
event_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/steps-from-apps.d.ts:80

***

### type

```ts
type: "workflow_step_execute";
```

Defined in: node\_modules/@slack/types/dist/events/steps-from-apps.d.ts:62

***

### workflow\_step

```ts
workflow_step: object;
```

Defined in: node\_modules/@slack/types/dist/events/steps-from-apps.d.ts:64

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
