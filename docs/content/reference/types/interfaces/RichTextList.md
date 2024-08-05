# Interface: RichTextList

## Description

A list block within a rich text field.

## Extends

- [`RichTextBorderable`](RichTextBorderable.md)

## Properties

### border?

```ts
optional border: 0 | 1;
```

#### Description

Whether to render a quote-block-like border on the inline side of the list. `0` renders no border
while `1` renders a border.

#### Inherited from

[`RichTextBorderable`](RichTextBorderable.md).[`border`](RichTextBorderable.md#border)

#### Defined in

[block-kit/extensions.ts:76](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/extensions.ts#L76)

***

### elements

```ts
elements: RichTextSection[];
```

#### Description

An array of [RichTextSection](RichTextSection.md) elements comprising each list item.

#### Defined in

[block-kit/block-elements.ts:980](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/block-elements.ts#L980)

***

### indent?

```ts
optional indent: number;
```

#### Description

The style of the list points. Can be a number from `0` (default) to `8`. Yields a different character
or characters rendered as the list points. Also affected by the `style` property.

#### Defined in

[block-kit/block-elements.ts:990](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/block-elements.ts#L990)

***

### style

```ts
style: "bullet" | "ordered";
```

#### Description

The type of list. Can be either `bullet` (the list points are all rendered the same way) or `ordered`
(the list points increase numerically from 1).

#### Defined in

[block-kit/block-elements.ts:985](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/block-elements.ts#L985)

***

### type

```ts
type: "rich_text_list";
```

#### Description

The type of element. In this case `type` is always `rich_text_list`.

#### Defined in

[block-kit/block-elements.ts:976](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/block-elements.ts#L976)
