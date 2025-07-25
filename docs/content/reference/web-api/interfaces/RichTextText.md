[@slack/web-api](../index.md) / RichTextText

# Interface: RichTextText

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:740

## Description

A generic text element for use in a rich text message.

## Extends

- [`RichTextStyleable`](RichTextStyleable.md)

## Properties

### style?

```ts
optional style: object;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:75

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

#### Description

A limited style object for styling rich text `text` elements.

#### Inherited from

[`RichTextStyleable`](RichTextStyleable.md).[`style`](RichTextStyleable.md#style)

***

### text

```ts
text: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:748

#### Description

The text to render.

***

### type

```ts
type: "text";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:744

#### Description

The type of element. In this case `type` is always `text`.
