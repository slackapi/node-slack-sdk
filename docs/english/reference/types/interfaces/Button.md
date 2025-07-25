[@slack/types](../index.md) / Button

# Interface: Button

Defined in: [block-kit/block-elements.ts:29](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L29)

## Description

Allows users a direct path to performing basic actions.

## See

 - [Button element reference](https://docs.slack.dev/reference/block-kit/block-elements/button-element).
 - [is an interactive component - see our guide to enabling interactivity](https://docs.slack.dev/interactivity/handling-user-interactionThis).

## Extends

- [`Actionable`](Actionable.md).[`Confirmable`](Confirmable.md)

## Properties

### accessibility\_label?

```ts
optional accessibility_label: string;
```

Defined in: [block-kit/block-elements.ts:63](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L63)

#### Description

A label for longer descriptive text about a button element. This label will be read out by screen
readers instead of the button `text` object. Maximum length for this field is 75 characters.

***

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

### style?

```ts
optional style: ColorScheme;
```

Defined in: [block-kit/block-elements.ts:58](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L58)

#### Description

Decorates buttons with alternative visual color schemes. Use this option with restraint.
`primary` gives buttons a green outline and text, ideal for affirmation or confirmation actions. `primary` should
only be used for one button within a set.
`danger` gives buttons a red outline and text, and should be used when the action is destructive. Use `danger` even
more sparingly than primary.
If you don't include this field, the default button style will be used.

***

### text

```ts
text: PlainTextElement;
```

Defined in: [block-kit/block-elements.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L38)

#### Description

A [PlainTextElement](PlainTextElement.md) that defines the button's text. `text` may truncate with ~30 characters.
Maximum length for the text in this field is 75 characters.

***

### type

```ts
type: "button";
```

Defined in: [block-kit/block-elements.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L33)

#### Description

The type of element. In this case `type` is always `button`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)

***

### url?

```ts
optional url: string;
```

Defined in: [block-kit/block-elements.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L49)

#### Description

A URL to load in the user's browser when the button is clicked. Maximum length for this field is 3000
characters. If you're using `url`, you'll still receive an [interaction payload](https://docs.slack.dev/interactivity/handling-user-interaction#payloads)
and will need to send an [acknowledgement response](https://docs.slack.dev/interactivity/handling-user-interaction#acknowledgment_response).

***

### value?

```ts
optional value: string;
```

Defined in: [block-kit/block-elements.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L43)

#### Description

The value to send along with the [interaction payload](https://docs.slack.dev/interactivity/handling-user-interaction#payloads).
Maximum length for this field is 2000 characters.
