# Interface: ~~WorkflowStepView~~

[Configuration modal](https://api.slack.com/legacy/workflows/steps#handle_config_view) for [legacy Workflow Steps from Apps](https://api.slack.com/legacy/workflows/steps).

## Deprecated

Steps from Apps are deprecated and will no longer be executed starting September 12, 2024. For more information, see our [deprecation announcement](https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back).

## Properties

### ~~blocks~~

```ts
blocks: (Block | KnownBlock)[];
```

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/views.d.ts:28

***

### ~~callback\_id?~~

```ts
optional callback_id: string;
```

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/views.d.ts:30

***

### ~~external\_id?~~

```ts
optional external_id: string;
```

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/views.d.ts:32

***

### ~~private\_metadata?~~

```ts
optional private_metadata: string;
```

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/views.d.ts:29

***

### ~~submit\_disabled?~~

```ts
optional submit_disabled: boolean;
```

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/views.d.ts:31

***

### ~~type~~

```ts
type: "workflow_step";
```

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/views.d.ts:27
