[@slack/web-api](../index.md) / RichTextBorderable

# Interface: RichTextBorderable

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:61

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

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:66

#### Description

Whether to render a quote-block-like border on the inline side of the list. `0` renders no border
while `1` renders a border.
