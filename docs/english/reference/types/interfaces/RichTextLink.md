[@slack/types](../index.md) / RichTextLink

# Interface: RichTextLink

Defined in: [block-kit/block-elements.ts:797](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L797)

## Description

A link element for use in a rich text message.

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

### text?

```ts
optional text: string;
```

Defined in: [block-kit/block-elements.ts:805](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L805)

#### Description

The text to link.

***

### type

```ts
type: "link";
```

Defined in: [block-kit/block-elements.ts:801](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L801)

#### Description

The type of element. In this case `type` is always `link`.

***

### unsafe?

```ts
optional unsafe: boolean;
```

Defined in: [block-kit/block-elements.ts:809](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L809)

#### Description

TODO: ?

***

### url

```ts
url: string;
```

Defined in: [block-kit/block-elements.ts:813](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L813)

#### Description

URL to link to.
