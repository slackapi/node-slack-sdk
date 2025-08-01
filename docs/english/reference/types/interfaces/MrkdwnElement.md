[@slack/types](../index.md) / MrkdwnElement

# Interface: MrkdwnElement

Defined in: [block-kit/composition-objects.ts:157](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L157)

## Description

Defines an object containing some text.

## See

[Text object reference](https://docs.slack.dev/reference/block-kit/composition-objects/text-object).

## Properties

### text

```ts
text: string;
```

Defined in: [block-kit/composition-objects.ts:166](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L166)

#### Description

The text for the block. This field accepts any of the standard text formatting markup.
The minimum length is 1 and maximum length is 3000 characters.

***

### type

```ts
type: "mrkdwn";
```

Defined in: [block-kit/composition-objects.ts:161](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L161)

#### Description

The formatting to use for this text object.

***

### verbatim?

```ts
optional verbatim: boolean;
```

Defined in: [block-kit/composition-objects.ts:173](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L173)

#### Description

When set to `false` (as is default) URLs will be auto-converted into links, conversation names will
be link-ified, and certain mentions will be [automatically parsed](https://docs.slack.dev/messaging/formatting-message-text).
Using a value of `true` will skip any preprocessing of this nature, although you can still include
[manual parsing strings](https://docs.slack.dev/messaging/formatting-message-text).
