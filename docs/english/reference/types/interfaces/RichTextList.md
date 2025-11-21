[@slack/types](../index.md) / RichTextList

# Interface: RichTextList

Defined in: [block-kit/block-elements.ts:983](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L983)

## Description

A list block within a rich text field.

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
elements: RichTextSection[];
```

Defined in: [block-kit/block-elements.ts:991](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L991)

#### Description

An array of [RichTextSection](RichTextSection.md) elements comprising each list item.

***

### indent?

```ts
optional indent: number;
```

Defined in: [block-kit/block-elements.ts:1001](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L1001)

#### Description

The style of the list points. Can be a number from `0` (default) to `8`. Yields a different character
or characters rendered as the list points. Also affected by the `style` property.

***

### style

```ts
style: "bullet" | "ordered";
```

Defined in: [block-kit/block-elements.ts:996](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L996)

#### Description

The type of list. Can be either `bullet` (the list points are all rendered the same way) or `ordered`
(the list points increase numerically from 1).

***

### type

```ts
type: "rich_text_list";
```

Defined in: [block-kit/block-elements.ts:987](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L987)

#### Description

The type of element. In this case `type` is always `rich_text_list`.
