# Interface: RichTextBorderable

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

#### Description

Whether to render a quote-block-like border on the inline side of the list. `0` renders no border
while `1` renders a border.

#### Defined in

[block-kit/extensions.ts:76](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/extensions.ts#L76)
