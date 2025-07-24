[@slack/types](../index.md) / DateTimepicker

# Interface: DateTimepicker

Defined in: [block-kit/block-elements.ts:112](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L112)

## Description

Allows users to select both a date and a time of day, formatted as a Unix timestamp. On desktop
clients, this time picker will take the form of a dropdown list and the date picker will take the form of a dropdown
calendar. Both options will have free-text entry for precise choices. On mobile clients, the time picker and date
picker will use native UIs.

## See

 - [Datetime picker element reference](https://docs.slack.dev/reference/block-kit/block-elements/datetime-picker-element).
 - [This is an interactive component - see our guide to enabling interactivity](https://docs.slack.dev/interactivity/handling-user-interaction).

## Extends

- [`Actionable`](Actionable.md).[`Confirmable`](Confirmable.md).[`Focusable`](Focusable.md)

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

### initial\_date\_time?

```ts
optional initial_date_time: number;
```

Defined in: [block-kit/block-elements.ts:122](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L122)

#### Description

The initial date and time that is selected when the element is loaded, represented as a UNIX
timestamp in seconds. This should be in the format of 10 digits, for example `1628633820` represents the date and
time August 10th, 2021 at 03:17pm PST.

***

### type

```ts
type: "datetimepicker";
```

Defined in: [block-kit/block-elements.ts:116](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L116)

#### Description

The type of element. In this case `type` is always `datetimepicker`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
