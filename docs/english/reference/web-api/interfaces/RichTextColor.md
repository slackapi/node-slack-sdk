[@slack/web-api](../index.md) / RichTextColor

# Interface: RichTextColor

Defined in: packages/types/dist/block-kit/block-elements.d.ts:712

## Description

A hex color element for use in a rich text message.

## Extends

- [`RichTextStyleable`](RichTextStyleable.md)

## Properties

### style?

```ts
optional style: object;
```

Defined in: packages/types/dist/block-kit/extensions.d.ts:75

#### bold?

```ts
optional bold: boolean;
```

##### Description

When `true`, boldens the text in this element. Defaults to `false`.

#### code?

```ts
optional code: boolean;
```

##### Description

When `true`, the text is preformatted in an inline code style. Defaults to `false.

#### italic?

```ts
optional italic: boolean;
```

##### Description

When `true`, italicizes the text in this element. Defaults to `false`.

#### strike?

```ts
optional strike: boolean;
```

##### Description

When `true`, strikes through the text in this element. Defaults to `false`.

#### underline?

```ts
optional underline: boolean;
```

##### Description

When `true`, underlines the text in this element. Defaults to `false`.

#### Description

A limited style object for styling rich text `text` elements.

#### Inherited from

[`RichTextStyleable`](RichTextStyleable.md).[`style`](RichTextStyleable.md#style)

***

### type

```ts
type: "color";
```

Defined in: packages/types/dist/block-kit/block-elements.d.ts:716

#### Description

The type of element. In this case `type` is always `color`.

***

### value

```ts
value: string;
```

Defined in: packages/types/dist/block-kit/block-elements.d.ts:720

#### Description

The hex value for the color.
