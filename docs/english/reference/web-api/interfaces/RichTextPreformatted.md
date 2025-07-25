[@slack/web-api](../index.md) / RichTextPreformatted

# Interface: RichTextPreformatted

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:829

## Description

A block of preformatted text within a rich text field.

## Extends

- [`RichTextBorderable`](RichTextBorderable.md)

## Properties

### border?

```ts
optional border: 0 | 1;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:66

#### Description

Whether to render a quote-block-like border on the inline side of the list. `0` renders no border
while `1` renders a border.

#### Inherited from

[`RichTextBorderable`](RichTextBorderable.md).[`border`](RichTextBorderable.md#border)

***

### elements

```ts
elements: (RichTextLink | RichTextText)[];
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:837

#### Description

An array of either [RichTextLink](RichTextLink.md) or [RichTextText](RichTextText.md) comprising the preformatted text.

***

### type

```ts
type: "rich_text_preformatted";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:833

#### Description

The type of element. In this case `type` is always `rich_text_preformatted`.
