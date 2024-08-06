# Interface: ConfirmationDialog

## Description

Defines a dialog that adds a confirmation step to interactive elements.

## See

[Confirmation dialog object reference](https://api.slack.com/reference/block-kit/composition-objects#confirm).

## Extends

- [`Confirm`](Interface.Confirm.md)

## Properties

### confirm?

```ts
optional confirm: PlainTextElement;
```

#### Description

A [PlainTextElement](Interface.PlainTextElement.md) text object to define the text of the button that confirms the action.
Maximum length for the `text` in this field is 30 characters.

#### Inherited from

[`Confirm`](Interface.Confirm.md).[`confirm`](Interface.Confirm.md#confirm)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:22

***

### deny?

```ts
optional deny: PlainTextElement;
```

#### Description

A [PlainTextElement](Interface.PlainTextElement.md) text object to define the text of the button that cancels the action.
Maximum length for the `text` in this field is 30 characters.

#### Inherited from

[`Confirm`](Interface.Confirm.md).[`deny`](Interface.Confirm.md#deny)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:27

***

### style?

```ts
optional style: "danger" | "primary";
```

#### Description

Defines the color scheme applied to the `confirm` button. A value of `danger` will display the button
with a red background on desktop, or red text on mobile. A value of `primary` will display the button with a green
background on desktop, or blue text on mobile. If this field is not provided, the default value will be `primary`.

#### Inherited from

[`Confirm`](Interface.Confirm.md).[`style`](Interface.Confirm.md#style)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:33

***

### text

```ts
text: PlainTextElement | MrkdwnElement;
```

#### Description

A [PlainTextElement](Interface.PlainTextElement.md) text object that defines the explanatory text that appears in the confirm
dialog. Maximum length for the `text` in this field is 300 characters.

#### Inherited from

[`Confirm`](Interface.Confirm.md).[`text`](Interface.Confirm.md#text)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:17

***

### title?

```ts
optional title: PlainTextElement;
```

#### Description

A [PlainTextElement](Interface.PlainTextElement.md) text object that defines the dialog's title.
Maximum length for this field is 100 characters.

#### Inherited from

[`Confirm`](Interface.Confirm.md).[`title`](Interface.Confirm.md#title)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:12
