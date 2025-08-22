[@slack/types](../index.md) / RichTextBorderable

# Interface: RichTextBorderable

Defined in: [block-kit/extensions.ts:71](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L71)

For use in setting border style details on certain Rich Text elements.

## Extended by

- [`RichTextList`](RichTextList.md)
- [`RichTextQuote`](RichTextQuote.md)
- [`RichTextPreformatted`](RichTextPreformatted.md)

## Properties

### border?

```ts
optional border: 0 | 1;
```

Defined in: [block-kit/extensions.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L76)

#### Description

Whether to render a quote-block-like border on the inline side of the list. `0` renders no border
while `1` renders a border.
