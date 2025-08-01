[@slack/web-api](../index.md) / RichTextList

# Interface: RichTextList

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:793

## Description

A list block within a rich text field.

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
elements: RichTextSection[];
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:801

#### Description

An array of [RichTextSection](RichTextSection.md) elements comprising each list item.

***

### indent?

```ts
optional indent: number;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:811

#### Description

The style of the list points. Can be a number from `0` (default) to `8`. Yields a different character
or characters rendered as the list points. Also affected by the `style` property.

***

### style

```ts
style: "bullet" | "ordered";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:806

#### Description

The type of list. Can be either `bullet` (the list points are all rendered the same way) or `ordered`
(the list points increase numerically from 1).

***

### type

```ts
type: "rich_text_list";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:797

#### Description

The type of element. In this case `type` is always `rich_text_list`.
