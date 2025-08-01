[@slack/types](../index.md) / PlainTextElement

# Interface: PlainTextElement

Defined in: [block-kit/composition-objects.ts:138](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L138)

## Description

Defines an object containing some text.

## See

[Text object reference](https://docs.slack.dev/reference/block-kit/composition-objects/text-object).

## Properties

### emoji?

```ts
optional emoji: boolean;
```

Defined in: [block-kit/composition-objects.ts:150](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L150)

#### Description

Indicates whether emojis in a text field should be escaped into the colon emoji format.

***

### text

```ts
text: string;
```

Defined in: [block-kit/composition-objects.ts:146](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L146)

#### Description

The text for the block. The minimum length is 1 and maximum length is 3000 characters.

***

### type

```ts
type: "plain_text";
```

Defined in: [block-kit/composition-objects.ts:142](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L142)

#### Description

The formatting to use for this text object.
