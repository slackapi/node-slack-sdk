# Interface: MrkdwnElement

## Description

Defines an object containing some text.

## See

[Text object reference](https://api.slack.com/reference/block-kit/composition-objects#text).

## Properties

### text

```ts
text: string;
```

#### Description

The text for the block. This field accepts any of the standard text formatting markup.
The minimum length is 1 and maximum length is 3000 characters.

#### Defined in

[block-kit/composition-objects.ts:166](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L166)

***

### type

```ts
type: "mrkdwn";
```

#### Description

The formatting to use for this text object.

#### Defined in

[block-kit/composition-objects.ts:161](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L161)

***

### verbatim?

```ts
optional verbatim: boolean;
```

#### Description

When set to `false` (as is default) URLs will be auto-converted into links, conversation names will
be link-ified, and certain mentions will be [automatically parsed](https://api.slack.com/reference/surfaces/formatting#automatic-parsing).
Using a value of `true` will skip any preprocessing of this nature, although you can still include
[manual parsing strings](https://api.slack.com/reference/surfaces/formatting#advanced).

#### Defined in

[block-kit/composition-objects.ts:173](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L173)
