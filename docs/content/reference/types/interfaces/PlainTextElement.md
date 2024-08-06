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

[block-kit/composition-objects.ts:150](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L150)

***

### text

```ts
text: string;
```

#### Description

The text for the block. The minimum length is 1 and maximum length is 3000 characters.

#### Defined in

[block-kit/composition-objects.ts:146](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L146)

***

### type

```ts
type: "plain_text";
```

#### Description

The formatting to use for this text object.

#### Defined in

[block-kit/composition-objects.ts:142](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L142)
