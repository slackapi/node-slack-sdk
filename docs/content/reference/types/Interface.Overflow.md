# Interface: Overflow

## Description

Allows users to press a button to view a list of options.
Unlike the select menu, there is no typeahead field, and the button always appears with an ellipsis ('…') rather
than customizable text. As such, it is usually used if you want a more compact layout than a select menu, or to
supply a list of less visually important actions after a row of buttons. You can also specify simple URL links as
overflow menu options, instead of actions.

## See

 - [Overflow menu element reference](https://api.slack.com/reference/block-kit/block-elements#overflow).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).

## Extends

- [`Actionable`](Interface.Actionable.md).[`Confirmable`](Interface.Confirmable.md)

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

[block-kit/extensions.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L15)

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

[block-kit/extensions.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L25)

***

### options

```ts
options: PlainTextOption[];
```

#### Description

An array of up to 5 [PlainTextOption](Interface.PlainTextOption.md) to display in the menu.

#### Defined in

[block-kit/block-elements.ts:586](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L586)

***

### type

```ts
type: "overflow";
```

#### Description

The type of element. In this case `type` is always `number_input`.

#### Overrides

[`Actionable`](Interface.Actionable.md).[`type`](Interface.Actionable.md#type)

#### Defined in

[block-kit/block-elements.ts:581](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L581)
