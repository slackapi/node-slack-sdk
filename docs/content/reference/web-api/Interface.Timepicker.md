# Interface: Timepicker

## Description

Allows users to choose a time from a rich dropdown UI. On desktop clients, this time picker will take
the form of a dropdown list with free-text entry for precise choices. On mobile clients, the time picker will use
native time picker UIs.

## See

 - [Time picker element reference](https://api.slack.com/reference/block-kit/block-elements#timepicker).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).

## Extends

- [`Actionable`](Interface.Actionable.md).[`Confirmable`](Interface.Confirmable.md).[`Focusable`](Interface.Focusable.md).[`Placeholdable`](Interface.Placeholdable.md)

## Properties

### action\_id?

```ts
optional action_id: string;
```

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Actionable`](Interface.Actionable.md).[`action_id`](Interface.Actionable.md#action_id)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:12

***

### confirm?

```ts
optional confirm: ConfirmationDialog;
```

#### Description

A [Confirm](Interface.Confirm.md) object that defines an optional confirmation dialog after the element is interacted
with.

#### Inherited from

[`Confirmable`](Interface.Confirmable.md).[`confirm`](Interface.Confirmable.md#confirm)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:21

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

[`Focusable`](Interface.Focusable.md).[`focus_on_load`](Interface.Focusable.md#focus_on_load)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:29

***

### initial\_time?

```ts
optional initial_time: string;
```

#### Description

The initial time that is selected when the element is loaded. This should be in the format `HH:mm`,
where `HH` is the 24-hour format of an hour (00 to 23) and `mm` is minutes with leading zeros (00 to 59),
for example 22:25 for 10:25pm.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:550

***

### placeholder?

```ts
optional placeholder: PlainTextElement;
```

#### Description

A [PlainTextElement](Interface.PlainTextElement.md) object that defines the placeholder text shown on the element. Maximum
length for the `text` field in this object is 150 characters.

#### Inherited from

[`Placeholdable`](Interface.Placeholdable.md).[`placeholder`](Interface.Placeholdable.md#placeholder)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:36

***

### timezone?

```ts
optional timezone: string;
```

#### Description

A string in the IANA format, e.g. 'America/Chicago'. The timezone is displayed to end users as hint
text underneath the time picker. It is also passed to the app upon certain interactions, such as view_submission.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:555

***

### type

```ts
type: "timepicker";
```

#### Description

The type of element. In this case `type` is always `timepicker`.

#### Overrides

[`Actionable`](Interface.Actionable.md).[`type`](Interface.Actionable.md#type)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:544
