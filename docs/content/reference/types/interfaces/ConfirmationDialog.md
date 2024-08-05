# Interface: ConfirmationDialog

## Description

Defines a dialog that adds a confirmation step to interactive elements.

## See

[Confirmation dialog object reference](https://api.slack.com/reference/block-kit/composition-objects#confirm).

## Extends

- [`Confirm`](Confirm.md)

## Properties

### confirm?

```ts
optional confirm: PlainTextElement;
```

#### Description

A [PlainTextElement](PlainTextElement.md) text object to define the text of the button that confirms the action.
Maximum length for the `text` in this field is 30 characters.

#### Inherited from

[`Confirm`](Confirm.md).[`confirm`](Confirm.md#confirm)

#### Defined in

[block-kit/composition-objects.ts:34](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/composition-objects.ts#L34)

***

### deny?

```ts
optional deny: PlainTextElement;
```

#### Description

A [PlainTextElement](PlainTextElement.md) text object to define the text of the button that cancels the action.
Maximum length for the `text` in this field is 30 characters.

#### Inherited from

[`Confirm`](Confirm.md).[`deny`](Confirm.md#deny)

#### Defined in

[block-kit/composition-objects.ts:39](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/composition-objects.ts#L39)

***

### style?

```ts
optional style: ColorScheme;
```

#### Description

Defines the color scheme applied to the `confirm` button. A value of `danger` will display the button
with a red background on desktop, or red text on mobile. A value of `primary` will display the button with a green
background on desktop, or blue text on mobile. If this field is not provided, the default value will be `primary`.

#### Inherited from

[`Confirm`](Confirm.md).[`style`](Confirm.md#style)

#### Defined in

[block-kit/composition-objects.ts:45](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/composition-objects.ts#L45)

***

### text

```ts
text: PlainTextElement | MrkdwnElement;
```

#### Description

A [PlainTextElement](PlainTextElement.md) text object that defines the explanatory text that appears in the confirm
dialog. Maximum length for the `text` in this field is 300 characters.

#### Inherited from

[`Confirm`](Confirm.md).[`text`](Confirm.md#text)

#### Defined in

[block-kit/composition-objects.ts:29](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/composition-objects.ts#L29)

***

### title?

```ts
optional title: PlainTextElement;
```

#### Description

A [PlainTextElement](PlainTextElement.md) text object that defines the dialog's title.
Maximum length for this field is 100 characters.

#### Inherited from

[`Confirm`](Confirm.md).[`title`](Confirm.md#title)

#### Defined in

[block-kit/composition-objects.ts:24](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/composition-objects.ts#L24)
