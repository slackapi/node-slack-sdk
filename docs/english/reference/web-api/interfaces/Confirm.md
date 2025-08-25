[@slack/web-api](../index.md) / Confirm

# ~~Interface: Confirm~~

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:14

## Deprecated

Confirm aliased to [ConfirmationDialog](ConfirmationDialog.md) in order to make the construct clearer
and line up terminology with api.slack.com.

## Description

Defines a dialog that adds a confirmation step to interactive elements.

## See

[Confirmation dialog object reference](https://api.slack.com/reference/block-kit/composition-objects#confirm).

## Extended by

- [`ConfirmationDialog`](ConfirmationDialog.md)

## Properties

### ~~confirm?~~

```ts
optional confirm: PlainTextElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:29

#### Description

A [PlainTextElement](PlainTextElement.md) text object to define the text of the button that confirms the action.
Maximum length for the `text` in this field is 30 characters.

***

### ~~deny?~~

```ts
optional deny: PlainTextElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:34

#### Description

A [PlainTextElement](PlainTextElement.md) text object to define the text of the button that cancels the action.
Maximum length for the `text` in this field is 30 characters.

***

### ~~style?~~

```ts
optional style: ColorScheme;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:40

#### Description

Defines the color scheme applied to the `confirm` button. A value of `danger` will display the button
with a red background on desktop, or red text on mobile. A value of `primary` will display the button with a green
background on desktop, or blue text on mobile. If this field is not provided, the default value will be `primary`.

***

### ~~text~~

```ts
text: 
  | PlainTextElement
  | MrkdwnElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:24

#### Description

A [PlainTextElement](PlainTextElement.md) text object that defines the explanatory text that appears in the confirm
dialog. Maximum length for the `text` in this field is 300 characters.

***

### ~~title?~~

```ts
optional title: PlainTextElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:19

#### Description

A [PlainTextElement](PlainTextElement.md) text object that defines the dialog's title.
Maximum length for this field is 100 characters.
