[@slack/web-api](../index.md) / Overflow

# Interface: Overflow

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:439

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

- [`Actionable`](Actionable.md).[`Confirmable`](Confirmable.md)

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

### options

```ts
options: PlainTextOption[];
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:447

#### Description

An array of up to 5 [PlainTextOption](PlainTextOption.md) to display in the menu.

***

### type

```ts
type: "overflow";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:443

#### Description

The type of element. In this case `type` is always `number_input`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
