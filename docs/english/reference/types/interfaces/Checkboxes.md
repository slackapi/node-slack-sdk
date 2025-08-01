[@slack/types](../index.md) / Checkboxes

# Interface: Checkboxes

Defined in: [block-kit/block-elements.ts:71](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L71)

## Description

Allows users to choose multiple items from a list of options.

## See

 - [Checkboxes element reference](https://docs.slack.dev/reference/block-kit/block-elements/checkboxes-element).
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

### initial\_options?

```ts
optional initial_options: Option[];
```

Defined in: [block-kit/block-elements.ts:80](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L80)

#### Description

An array of [Option](../type-aliases/Option.md) objects that exactly matches one or more of the options within `options`.
These options will be selected when the checkbox group initially loads.

***

### options

```ts
options: Option[];
```

Defined in: [block-kit/block-elements.ts:84](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L84)

#### Description

An array of [Option](../type-aliases/Option.md) objects. A maximum of 10 options are allowed.

***

### type

```ts
type: "checkboxes";
```

Defined in: [block-kit/block-elements.ts:75](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L75)

#### Description

The type of element. In this case `type` is always `checkboxes`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
