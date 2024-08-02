# Interface: ~~WorkflowStepView~~

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

#### Description

An array of [AnyBlock](../type-aliases/AnyBlock.md) that defines the content of the view. Max of 100 blocks.

#### Inherited from

`BaseView.blocks`

#### Defined in

[views.ts:6](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/views.ts#L6)

***

### ~~callback\_id?~~

```ts
optional callback_id: string;
```

#### Description

An identifier to recognize interactions and submissions of this particular view. Don't use this to
store sensitive information (use `private_metadata` instead). Maximum length of 255 characters.

#### See

[Handling and responding to interactions](https://api.slack.com/surfaces/modals#interactions).

#### Inherited from

`BaseView.callback_id`

#### Defined in

[views.ts:19](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/views.ts#L19)

***

### ~~external\_id?~~

```ts
optional external_id: string;
```

#### Description

A custom identifier that must be unique for all views on a per-team basis.

#### Inherited from

`BaseView.external_id`

#### Defined in

[views.ts:21](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/views.ts#L21)

***

### ~~private\_metadata?~~

```ts
optional private_metadata: string;
```

#### Description

String that will be sent to your app in
[`view_submission`](https://api.slack.com/reference/interaction-payloads/views#view_submission) and
[`block_actions`](https://api.slack.com/reference/interaction-payloads/block-actions) events.
Maximum length of 3000 characters.

#### Inherited from

`BaseView.private_metadata`

#### Defined in

[views.ts:13](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/views.ts#L13)

***

### ~~submit\_disabled?~~

```ts
optional submit_disabled: boolean;
```

#### Description

When set to `true`, disables the submit button until the user has completed one or more inputs.
Defaults to `false`.

#### Defined in

[views.ts:73](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/views.ts#L73)

***

### ~~type~~

```ts
type: "workflow_step";
```

#### Defined in

[views.ts:68](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/views.ts#L68)
