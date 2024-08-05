# Interface: RichTextInput

## Description

A rich text input creates a composer/WYSIWYG editor for entering formatted text, offering nearly the
same experience you have writing messages in Slack.

## See

 - [Rich-text input element reference](https://api.slack.com/reference/block-kit/block-elements#rich_text_input).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).

## Extends

- [`Actionable`](Actionable.md).[`Dispatchable`](Dispatchable.md).[`Focusable`](Focusable.md).[`Placeholdable`](Placeholdable.md)

## Properties

### action\_id?

```ts
optional action_id: string;
```

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Actionable`](Actionable.md).[`action_id`](Actionable.md#action_id)

#### Defined in

[block-kit/extensions.ts:15](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/extensions.ts#L15)

***

### dispatch\_action\_config?

```ts
optional dispatch_action_config: DispatchActionConfig;
```

#### Description

A [DispatchActionConfig](DispatchActionConfig.md) object that determines when during text input the element returns a
[`block_actions` payload](https://api.slack.com/reference/interaction-payloads/block-actions).

#### Inherited from

[`Dispatchable`](Dispatchable.md).[`dispatch_action_config`](Dispatchable.md#dispatch_action_config)

#### Defined in

[block-kit/extensions.ts:33](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/extensions.ts#L33)

***

### focus\_on\_load?

```ts
optional focus_on_load: boolean;
```

#### Description

Indicates whether the element will be set to auto focus within the
[`view` object](https://api.slack.com/reference/surfaces/views). Only one element can be set to `true`.
Defaults to `false`.

#### Inherited from

[`Focusable`](Focusable.md).[`focus_on_load`](Focusable.md#focus_on_load)

#### Defined in

[block-kit/extensions.ts:42](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/extensions.ts#L42)

***

### initial\_value?

```ts
optional initial_value: RichTextBlock;
```

#### Description

Initial contents of the input when it is loaded.

#### Defined in

[block-kit/block-elements.ts:1039](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/block-elements.ts#L1039)

***

### placeholder?

```ts
optional placeholder: PlainTextElement;
```

#### Description

A [PlainTextElement](PlainTextElement.md) object that defines the placeholder text shown on the element. Maximum
length for the `text` field in this object is 150 characters.

#### Inherited from

[`Placeholdable`](Placeholdable.md).[`placeholder`](Placeholdable.md#placeholder)

#### Defined in

[block-kit/extensions.ts:57](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/extensions.ts#L57)

***

### type

```ts
type: "rich_text_input";
```

#### Description

The type of element. In this case `type` is always `rich_text_input`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)

#### Defined in

[block-kit/block-elements.ts:1035](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/block-elements.ts#L1035)
