[@slack/web-api](../index.md) / RichTextQuote

# Interface: RichTextQuote

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:816

## Description

A quote block within a rich text field.

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
elements: RichTextElement[];
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:824

#### Description

An array of [RichTextElement](../type-aliases/RichTextElement.md) comprising the quote block.

***

### type

```ts
type: "rich_text_quote";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:820

#### Description

The type of element. In this case `type` is always `rich_text_quote`.
