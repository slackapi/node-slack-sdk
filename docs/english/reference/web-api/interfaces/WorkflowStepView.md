[@slack/web-api](../index.md) / WorkflowStepView

# ~~Interface: WorkflowStepView~~

Defined in: node\_modules/@slack/types/dist/views.d.ts:61

[Configuration modal](https://api.slack.com/legacy/workflows/steps#handle_config_view) for [legacy Workflow Steps from Apps](https://api.slack.com/legacy/workflows/steps).

## Deprecated

Steps from Apps are deprecated and will no longer be executed starting September 12, 2024. For more information, see our [deprecation announcement](https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back).

## Extends

- `BaseView`

## Properties

### ~~blocks~~

```ts
blocks: AnyBlock[];
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:5

#### Description

An array of [AnyBlock](../type-aliases/AnyBlock.md) that defines the content of the view. Max of 100 blocks.

#### Inherited from

```ts
BaseView.blocks
```

***

### ~~callback\_id?~~

```ts
optional callback_id: string;
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:18

#### Description

An identifier to recognize interactions and submissions of this particular view. Don't use this to
store sensitive information (use `private_metadata` instead). Maximum length of 255 characters.

#### See

[Handling and responding to interactions](https://api.slack.com/surfaces/modals#interactions).

#### Inherited from

```ts
BaseView.callback_id
```

***

### ~~external\_id?~~

```ts
optional external_id: string;
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:20

#### Description

A custom identifier that must be unique for all views on a per-team basis.

#### Inherited from

```ts
BaseView.external_id
```

***

### ~~private\_metadata?~~

```ts
optional private_metadata: string;
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:12

#### Description

String that will be sent to your app in
[\`view\_submission\`](https://api.slack.com/reference/interaction-payloads/views#view_submission) and
[\`block\_actions\`](https://api.slack.com/reference/interaction-payloads/block-actions) events.
Maximum length of 3000 characters.

#### Inherited from

```ts
BaseView.private_metadata
```

***

### ~~submit\_disabled?~~

```ts
optional submit_disabled: boolean;
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:67

#### Description

When set to `true`, disables the submit button until the user has completed one or more inputs.
Defaults to `false`.

***

### ~~type~~

```ts
type: "workflow_step";
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:62
