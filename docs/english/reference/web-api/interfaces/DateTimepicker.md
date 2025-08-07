[@slack/web-api](../index.md) / DateTimepicker

# Interface: DateTimepicker

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:89

## Description

Allows users to select both a date and a time of day, formatted as a Unix timestamp. On desktop
clients, this time picker will take the form of a dropdown list and the date picker will take the form of a dropdown
calendar. Both options will have free-text entry for precise choices. On mobile clients, the time picker and date
picker will use native UIs.

## See

 - [Datetime picker element reference](https://api.slack.com/reference/block-kit/block-elements#datetimepicker).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).

## Extends

- [`Actionable`](Actionable.md).[`Confirmable`](Confirmable.md).[`Focusable`](Focusable.md)

## Properties

### action\_id?

```ts
optional action_id: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:12

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Actionable`](Actionable.md).[`action_id`](Actionable.md#action_id)

***

### confirm?

```ts
optional confirm: ConfirmationDialog;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:21

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

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:36

#### Description

Indicates whether the element will be set to auto focus within the
[\`view\` object](https://api.slack.com/reference/surfaces/views). Only one element can be set to `true`.
Defaults to `false`.

#### Inherited from

[`Focusable`](Focusable.md).[`focus_on_load`](Focusable.md#focus_on_load)

***

### initial\_date\_time?

```ts
optional initial_date_time: number;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:99

#### Description

The initial date and time that is selected when the element is loaded, represented as a UNIX
timestamp in seconds. This should be in the format of 10 digits, for example `1628633820` represents the date and
time August 10th, 2021 at 03:17pm PST.

***

### type

```ts
type: "datetimepicker";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:93

#### Description

The type of element. In this case `type` is always `datetimepicker`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
