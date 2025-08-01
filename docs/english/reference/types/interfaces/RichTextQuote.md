[@slack/types](../index.md) / RichTextQuote

# Interface: RichTextQuote

Defined in: [block-kit/block-elements.ts:925](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L925)

## Description

A quote block within a rich text field.

## Extends

- [`RichTextBorderable`](RichTextBorderable.md)

## Properties

### border?

```ts
optional border: 0 | 1;
```

Defined in: [block-kit/extensions.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L76)

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

Defined in: [block-kit/block-elements.ts:933](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L933)

#### Description

An array of [RichTextElement](../type-aliases/RichTextElement.md) comprising the quote block.

***

### type

```ts
type: "rich_text_quote";
```

Defined in: [block-kit/block-elements.ts:929](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L929)

#### Description

The type of element. In this case `type` is always `rich_text_quote`.
