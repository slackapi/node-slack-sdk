[@slack/web-api](../index.md) / ConfirmationDialog

# Interface: ConfirmationDialog

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:46

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

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:29

#### Description

A [PlainTextElement](PlainTextElement.md) text object to define the text of the button that confirms the action.
Maximum length for the `text` in this field is 30 characters.

#### Inherited from

[`Confirm`](Confirm.md).[`confirm`](Confirm.md#confirm)

***

### deny?

```ts
optional deny: PlainTextElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:34

#### Description

A [PlainTextElement](PlainTextElement.md) text object to define the text of the button that cancels the action.
Maximum length for the `text` in this field is 30 characters.

#### Inherited from

[`Confirm`](Confirm.md).[`deny`](Confirm.md#deny)

***

### style?

```ts
optional style: ColorScheme;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:40

#### Description

Defines the color scheme applied to the `confirm` button. A value of `danger` will display the button
with a red background on desktop, or red text on mobile. A value of `primary` will display the button with a green
background on desktop, or blue text on mobile. If this field is not provided, the default value will be `primary`.

#### Inherited from

[`Confirm`](Confirm.md).[`style`](Confirm.md#style)

***

### text

```ts
text: 
  | PlainTextElement
  | MrkdwnElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:24

#### Description

A [PlainTextElement](PlainTextElement.md) text object that defines the explanatory text that appears in the confirm
dialog. Maximum length for the `text` in this field is 300 characters.

#### Inherited from

[`Confirm`](Confirm.md).[`text`](Confirm.md#text)

***

### title?

```ts
optional title: PlainTextElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:19

#### Description

A [PlainTextElement](PlainTextElement.md) text object that defines the dialog's title.
Maximum length for this field is 100 characters.

#### Inherited from

[`Confirm`](Confirm.md).[`title`](Confirm.md#title)
