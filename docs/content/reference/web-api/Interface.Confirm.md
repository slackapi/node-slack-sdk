# Interface: ~~Confirm~~

## Deprecated

[Confirm](Interface.Confirm.md) aliased to [ConfirmationDialog](Interface.ConfirmationDialog.md) in order to make the construct clearer
and line up terminology with api.slack.com.

## Description

Defines a dialog that adds a confirmation step to interactive elements.

## See

[Confirmation dialog object reference](https://api.slack.com/reference/block-kit/composition-objects#confirm).

## Extended by

- [`ConfirmationDialog`](Interface.ConfirmationDialog.md)

## Properties

### ~~confirm?~~

```ts
optional confirm: PlainTextElement;
```

#### Description

A [PlainTextElement](Interface.PlainTextElement.md) text object to define the text of the button that confirms the action.
Maximum length for the `text` in this field is 30 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:22

***

### ~~deny?~~

```ts
optional deny: PlainTextElement;
```

#### Description

A [PlainTextElement](Interface.PlainTextElement.md) text object to define the text of the button that cancels the action.
Maximum length for the `text` in this field is 30 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:27

***

### ~~style?~~

```ts
optional style: "danger" | "primary";
```

#### Description

Defines the color scheme applied to the `confirm` button. A value of `danger` will display the button
with a red background on desktop, or red text on mobile. A value of `primary` will display the button with a green
background on desktop, or blue text on mobile. If this field is not provided, the default value will be `primary`.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:33

***

### ~~text~~

```ts
text: PlainTextElement | MrkdwnElement;
```

#### Description

A [PlainTextElement](Interface.PlainTextElement.md) text object that defines the explanatory text that appears in the confirm
dialog. Maximum length for the `text` in this field is 300 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:17

***

### ~~title?~~

```ts
optional title: PlainTextElement;
```

#### Description

A [PlainTextElement](Interface.PlainTextElement.md) text object that defines the dialog's title.
Maximum length for this field is 100 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:12
