[@slack/web-api](../index.md) / PlainTextElement

# Interface: PlainTextElement

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:125

## Description

Defines an object containing some text.

## See

[Text object reference](https://api.slack.com/reference/block-kit/composition-objects#text).

## Properties

### emoji?

```ts
optional emoji: boolean;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:137

#### Description

Indicates whether emojis in a text field should be escaped into the colon emoji format.

***

### text

```ts
text: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:133

#### Description

The text for the block. The minimum length is 1 and maximum length is 3000 characters.

***

### type

```ts
type: "plain_text";
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:129

#### Description

The formatting to use for this text object.
