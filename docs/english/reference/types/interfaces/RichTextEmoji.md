[@slack/types](../index.md) / RichTextEmoji

# Interface: RichTextEmoji

Defined in: [block-kit/block-elements.ts:857](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L857)

## Description

An emoji element for use in a rich text message.

## Extends

- [`RichTextStyleable`](RichTextStyleable.md)

## Properties

### name

```ts
name: string;
```

Defined in: [block-kit/block-elements.ts:865](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L865)

#### Description

Name of emoji, without colons or skin tones, e.g. `wave`

***

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
type: "emoji";
```

Defined in: [block-kit/block-elements.ts:861](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L861)

#### Description

The type of element. In this case `type` is always `emoji`.

***

### unicode?

```ts
optional unicode: string;
```

Defined in: [block-kit/block-elements.ts:869](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L869)

#### Description

Lowercase hexadecimal Unicode representation of a standard emoji (not for use with custom emoji).

***

### url?

```ts
optional url: string;
```

Defined in: [block-kit/block-elements.ts:873](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L873)

#### Description

URL of emoji asset. Only used when sharing custom emoji across workspaces.
