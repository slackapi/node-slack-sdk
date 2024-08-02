# Interface: PlainTextElement

## Description

Defines an object containing some text.

## See

[Text object reference](https://api.slack.com/reference/block-kit/composition-objects#text).

## Properties

### emoji?

```ts
optional emoji: boolean;
```

#### Description

Indicates whether emojis in a text field should be escaped into the colon emoji format.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:124

***

### text

```ts
text: string;
```

#### Description

The text for the block. The minimum length is 1 and maximum length is 3000 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:120

***

### type

```ts
type: "plain_text";
```

#### Description

The formatting to use for this text object.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:116
