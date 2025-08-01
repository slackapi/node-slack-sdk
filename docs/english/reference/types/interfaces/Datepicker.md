[@slack/types](../index.md) / Datepicker

# Interface: Datepicker

Defined in: [block-kit/block-elements.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L92)

## Description

Allows users to select a date from a calendar style UI.

## See

 - [Date picker element reference](https://docs.slack.dev/reference/block-kit/block-elements/date-picker-element).
 - [This is an interactive component - see our guide to enabling interactivity](https://docs.slack.dev/interactivity/handling-user-interaction).

## Extends

- [`Actionable`](Actionable.md).[`Confirmable`](Confirmable.md).[`Focusable`](Focusable.md).[`Placeholdable`](Placeholdable.md)

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

### confirm?

```ts
optional confirm: ConfirmationDialog;
```

Defined in: [block-kit/extensions.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L25)

#### Description

A [Confirm](Confirm.md) object that defines an optional confirmation dialog after the element is interacted
with.

#### Inherited from

[`Confirmable`](Confirmable.md).[`confirm`](Confirmable.md#confirm)

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

### initial\_date?

```ts
optional initial_date: string;
```

Defined in: [block-kit/block-elements.ts:101](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L101)

#### Description

The initial date that is selected when the element is loaded.
This should be in the format `YYYY-MM-DD`.

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
type: "datepicker";
```

Defined in: [block-kit/block-elements.ts:96](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L96)

#### Description

The type of element. In this case `type` is always `datepicker`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
