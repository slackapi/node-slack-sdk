# Interface: RichTextPreformatted

## Description

A block of preformatted text within a rich text field.

## Extends

- [`RichTextBorderable`](Interface.RichTextBorderable.md)

## Properties

### border?

```ts
optional border: 0 | 1;
```

#### Description

Whether to render a quote-block-like border on the inline side of the list. `0` renders no border
while `1` renders a border.

#### Inherited from

[`RichTextBorderable`](Interface.RichTextBorderable.md).[`border`](Interface.RichTextBorderable.md#border)

#### Defined in

[block-kit/extensions.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L76)

***

### elements

```ts
elements: (RichTextLink | RichTextText)[];
```

#### Description

An array of either [RichTextLink](Interface.RichTextLink.md) or [RichTextText](Interface.RichTextText.md) comprising the preformatted text.

#### Defined in

[block-kit/block-elements.ts:1018](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L1018)

***

### type

```ts
type: "rich_text_preformatted";
```

#### Description

The type of element. In this case `type` is always `rich_text_preformatted`.

#### Defined in

[block-kit/block-elements.ts:1014](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L1014)
