[@slack/types](../index.md) / EmailInput

# Interface: EmailInput

Defined in: [block-kit/block-elements.ts:130](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L130)

## Description

Allows user to enter an email into a single-line field.

## See

 - [Email input element reference](https://docs.slack.dev/reference/block-kit/block-elements/email-input-element).
 - [This is an interactive component - see our guide to enabling interactivity](https://docs.slack.dev/interactivity/handling-user-interaction).

## Extends

- [`Actionable`](Actionable.md).[`Dispatchable`](Dispatchable.md).[`Focusable`](Focusable.md).[`Placeholdable`](Placeholdable.md)

## Properties

### action\_id?

```ts
optional action_id: string;
```

Defined in: [block-kit/extensions.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L15)

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Actionable`](Actionable.md).[`action_id`](Actionable.md#action_id)

***

### dispatch\_action\_config?

```ts
optional dispatch_action_config: DispatchActionConfig;
```

Defined in: [block-kit/extensions.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L33)

#### Description

A [DispatchActionConfig](DispatchActionConfig.md) object that determines when during text input the element returns a
[\`block\_actions\` payload](https://docs.slack.dev/reference/interaction-payloads/block_actions-payload).

#### Inherited from

[`Dispatchable`](Dispatchable.md).[`dispatch_action_config`](Dispatchable.md#dispatch_action_config)

***

### focus\_on\_load?

```ts
optional focus_on_load: boolean;
```

Defined in: [block-kit/extensions.ts:42](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L42)

#### Description

Indicates whether the element will be set to auto focus within the
[\`view\` object](https://docs.slack.dev/surfaces/modals). Only one element can be set to `true`.
Defaults to `false`.

#### Inherited from

[`Focusable`](Focusable.md).[`focus_on_load`](Focusable.md#focus_on_load)

***

### initial\_value?

```ts
optional initial_value: string;
```

Defined in: [block-kit/block-elements.ts:138](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L138)

#### Description

The initial value in the email input when it is loaded.

***

### placeholder?

```ts
optional placeholder: PlainTextElement;
```

Defined in: [block-kit/extensions.ts:57](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L57)

#### Description

A [PlainTextElement](PlainTextElement.md) object that defines the placeholder text shown on the element. Maximum
length for the `text` field in this object is 150 characters.

#### Inherited from

[`Placeholdable`](Placeholdable.md).[`placeholder`](Placeholdable.md#placeholder)

***

### type

```ts
type: "email_text_input";
```

Defined in: [block-kit/block-elements.ts:134](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L134)

#### Description

The type of element. In this case `type` is always `email_text_input`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
