[@slack/web-api](../index.md) / RichTextChannelMention

# Interface: RichTextChannelMention

Defined in: packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:703

## Description

A channel mention element for use in a rich text message.

## Extends

- [`RichTextStyleable`](RichTextStyleable.md)

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:711

#### Description

The encoded channel ID, e.g. C1234ABCD.

***

### style?

```ts
optional style: object;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:75

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

### type

```ts
type: "channel";
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:707

#### Description

The type of element. In this case `type` is always `channel`.
