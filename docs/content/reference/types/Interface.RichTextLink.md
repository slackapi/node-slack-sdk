# Interface: RichTextLink

## Description

A link element for use in a rich text message.

## Extends

- [`RichTextStyleable`](Interface.RichTextStyleable.md)

## Properties

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

### text?

```ts
optional text: string;
```

#### Description

The text to link.

#### Defined in

[block-kit/block-elements.ts:876](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L876)

***

### type

```ts
type: "link";
```

#### Description

The type of element. In this case `type` is always `link`.

#### Defined in

[block-kit/block-elements.ts:872](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L872)

***

### unsafe?

```ts
optional unsafe: boolean;
```

#### Description

TODO: ?

#### Defined in

[block-kit/block-elements.ts:880](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L880)

***

### url

```ts
url: string;
```

#### Description

URL to link to.

#### Defined in

[block-kit/block-elements.ts:884](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L884)
