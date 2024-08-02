# Interface: ~~Confirm~~

## Deprecated

[Confirm](Confirm.md) aliased to [ConfirmationDialog](ConfirmationDialog.md) in order to make the construct clearer
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

#### Description

A [PlainTextElement](PlainTextElement.md) text object to define the text of the button that confirms the action.
Maximum length for the `text` in this field is 30 characters.

#### Defined in

[block-kit/composition-objects.ts:34](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/composition-objects.ts#L34)

***

### ~~deny?~~

```ts
optional deny: PlainTextElement;
```

#### Description

A [PlainTextElement](PlainTextElement.md) text object to define the text of the button that cancels the action.
Maximum length for the `text` in this field is 30 characters.

#### Defined in

[block-kit/composition-objects.ts:39](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/composition-objects.ts#L39)

***

### ~~style?~~

```ts
optional style: ColorScheme;
```

#### Description

Defines the color scheme applied to the `confirm` button. A value of `danger` will display the button
with a red background on desktop, or red text on mobile. A value of `primary` will display the button with a green
background on desktop, or blue text on mobile. If this field is not provided, the default value will be `primary`.

#### Defined in

[block-kit/composition-objects.ts:45](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/composition-objects.ts#L45)

***

### ~~text~~

```ts
text: PlainTextElement | MrkdwnElement;
```

#### Description

A [PlainTextElement](PlainTextElement.md) text object that defines the explanatory text that appears in the confirm
dialog. Maximum length for the `text` in this field is 300 characters.

#### Defined in

[block-kit/composition-objects.ts:29](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/composition-objects.ts#L29)

***

### ~~title?~~

```ts
optional title: PlainTextElement;
```

#### Description

A [PlainTextElement](PlainTextElement.md) text object that defines the dialog's title.
Maximum length for this field is 100 characters.

#### Defined in

[block-kit/composition-objects.ts:24](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/composition-objects.ts#L24)
