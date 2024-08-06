# Interface: Button

## Description

Allows users a direct path to performing basic actions.

## See

 - [Button element reference](https://api.slack.com/reference/block-kit/block-elements#button).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).

## Extends

- [`Actionable`](Interface.Actionable.md).[`Confirmable`](Interface.Confirmable.md)

## Properties

### accessibility\_label?

```ts
optional accessibility_label: string;
```

#### Description

A label for longer descriptive text about a button element. This label will be read out by screen
readers instead of the button `text` object. Maximum length for this field is 75 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:43

***

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

### style?

```ts
optional style: "danger" | "primary";
```

#### Description

Decorates buttons with alternative visual color schemes. Use this option with restraint.
`primary` gives buttons a green outline and text, ideal for affirmation or confirmation actions. `primary` should
only be used for one button within a set.
`danger` gives buttons a red outline and text, and should be used when the action is destructive. Use `danger` even
more sparingly than primary.
If you don't include this field, the default button style will be used.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:38

***

### text

```ts
text: PlainTextElement;
```

#### Description

A [PlainTextElement](Interface.PlainTextElement.md) that defines the button's text. `text` may truncate with ~30 characters.
Maximum length for the text in this field is 75 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:18

***

### type

```ts
type: "button";
```

#### Description

The type of element. In this case `type` is always `button`.

#### Overrides

[`Actionable`](Interface.Actionable.md).[`type`](Interface.Actionable.md#type)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:13

***

### url?

```ts
optional url: string;
```

#### Description

A URL to load in the user's browser when the button is clicked. Maximum length for this field is 3000
characters. If you're using `url`, you'll still receive an [interaction payload](https://api.slack.com/interactivity/handling#payloads)
and will need to send an [acknowledgement response](https://api.slack.com/interactivity/handling#acknowledgment_response).

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:29

***

### value?

```ts
optional value: string;
```

#### Description

The value to send along with the [interaction payload](https://api.slack.com/interactivity/handling#payloads).
Maximum length for this field is 2000 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:23
