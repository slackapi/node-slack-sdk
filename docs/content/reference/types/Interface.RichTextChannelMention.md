# Interface: RichTextChannelMention

## Description

A channel mention element for use in a rich text message.

## Extends

- [`RichTextStyleable`](Interface.RichTextStyleable.md)

## Properties

### channel\_id

```ts
channel_id: string;
```

#### Description

The encoded channel ID, e.g. C1234ABCD.

#### Defined in

[block-kit/block-elements.ts:794](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L794)

***

### style?

```ts
optional style: object;
```

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

[`RichTextStyleable`](Interface.RichTextStyleable.md).[`style`](Interface.RichTextStyleable.md#style)

#### Defined in

[block-kit/extensions.ts:86](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L86)

***

### type

```ts
type: "channel";
```

#### Description

The type of element. In this case `type` is always `channel`.

#### Defined in

[block-kit/block-elements.ts:790](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L790)
