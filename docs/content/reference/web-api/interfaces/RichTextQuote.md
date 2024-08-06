# Interface: RichTextQuote

## Description

A quote block within a rich text field.

## Properties

### border?

```ts
optional border: 0 | 1;
```

#### Description

Whether to render a quote-block-like border on the inline side of the text quote.
`0` renders no border, while `1` renders a border. Defaults to `0`.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:868

***

### elements

```ts
elements: RichTextElement[];
```

#### Description

An array of [RichTextElement](../type-aliases/RichTextElement.md) comprising the quote block.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:863

***

### type

```ts
type: "rich_text_quote";
```

#### Description

The type of element. In this case `type` is always `rich_text_quote`.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:859
