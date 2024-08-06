# Interface: Checkboxes

## Description

Allows users to choose multiple items from a list of options.

## See

 - [Checkboxes element reference](https://api.slack.com/reference/block-kit/block-elements#checkboxes).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).

## Extends

- [`Actionable`](Actionable.md).[`Confirmable`](Confirmable.md).[`Focusable`](Focusable.md)

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

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:12

***

### confirm?

```ts
optional confirm: ConfirmationDialog;
```

#### Description

A [Confirm](Confirm.md) object that defines an optional confirmation dialog after the element is interacted
with.

#### Inherited from

[`Confirmable`](Confirmable.md).[`confirm`](Confirmable.md#confirm)

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

[`Focusable`](Focusable.md).[`focus_on_load`](Focusable.md#focus_on_load)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:29

***

### initial\_options?

```ts
optional initial_options: Option[];
```

#### Description

An array of [Option](../type-aliases/Option.md) objects that exactly matches one or more of the options within `options`.
These options will be selected when the checkbox group initially loads.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:59

***

### options

```ts
options: Option[];
```

#### Description

An array of [Option](../type-aliases/Option.md) objects. A maximum of 10 options are allowed.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:63

***

### type

```ts
type: "checkboxes";
```

#### Description

The type of element. In this case `type` is always `checkboxes`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:54
