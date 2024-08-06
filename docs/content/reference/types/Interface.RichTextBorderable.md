# Interface: RichTextBorderable

For use in setting border style details on certain Rich Text elements.

## Extended by

- [`RichTextList`](Interface.RichTextList.md)
- [`RichTextQuote`](Interface.RichTextQuote.md)
- [`RichTextPreformatted`](Interface.RichTextPreformatted.md)

## Properties

### border?

```ts
optional border: 0 | 1;
```

#### Description

Whether to render a quote-block-like border on the inline side of the list. `0` renders no border
while `1` renders a border.

#### Defined in

[block-kit/extensions.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L76)
