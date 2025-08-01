[@slack/types](../index.md) / RichTextColor

# Interface: RichTextColor

Defined in: [block-kit/block-elements.ts:701](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L701)

## Description

A hex color element for use in a rich text message.

## Extends

- [`RichTextStyleable`](RichTextStyleable.md)

## Properties

### style?

```ts
optional style: object;
```

Defined in: [block-kit/extensions.ts:86](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L86)

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
type: "color";
```

Defined in: [block-kit/block-elements.ts:705](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L705)

#### Description

The type of element. In this case `type` is always `color`.

***

### value

```ts
value: string;
```

Defined in: [block-kit/block-elements.ts:709](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L709)

#### Description

The hex value for the color.
