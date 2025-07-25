[@slack/types](../index.md) / RadioButtons

# Interface: RadioButtons

Defined in: [block-kit/block-elements.ts:566](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L566)

## Description

Allows users to choose one item from a list of possible options.

## See

 - [Radio button group element reference](https://docs.slack.dev/reference/block-kit/block-elements/radio-button-group-element).
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

### initial\_option?

```ts
optional initial_option: Option;
```

Defined in: [block-kit/block-elements.ts:575](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L575)

#### Description

An [Option](../type-aliases/Option.md) object that exactly matches one of the options within `options`. This option will
be selected when the radio button group initially loads.

***

### options

```ts
options: Option[];
```

Defined in: [block-kit/block-elements.ts:579](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L579)

#### Description

An array of [Option](../type-aliases/Option.md) objects. A maximum of 10 options are allowed.

***

### type

```ts
type: "radio_buttons";
```

Defined in: [block-kit/block-elements.ts:570](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L570)

#### Description

The type of element. In this case `type` is always `radio_buttons`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
