# Interface: RichTextList

## Description

A list block within a rich text field.

## Properties

### border?

```ts
optional border: 0 | 1;
```

#### Description

Whether to render a quote-block-like border on the inline side of the list. `0` renders no border
while `1` renders a border.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:850

***

### elements

```ts
elements: RichTextSection[];
```

#### Description

An array of [RichTextSection](Interface.RichTextSection.md) elements comprising each list item.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:835

***

### indent?

```ts
optional indent: number;
```

#### Description

The style of the list points. Can be a number from `0` (default) to `8`. Yields a different character
or characters rendered as the list points. Also affected by the `style` property.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:845

***

### style

```ts
style: "bullet" | "ordered";
```

#### Description

The type of list. Can be either `bullet` (the list points are all rendered the same way) or `ordered`
(the list points increase numerically from 1).

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:840

***

### type

```ts
type: "rich_text_list";
```

#### Description

The type of element. In this case `type` is always `rich_text_list`.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:831
