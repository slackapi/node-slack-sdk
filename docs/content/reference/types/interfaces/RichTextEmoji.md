# Interface: RichTextEmoji

## Description

An emoji element for use in a rich text message.

## Extends

- [`RichTextStyleable`](RichTextStyleable.md)

## Properties

### name

```ts
name: string;
```

#### Description

Name of emoji, without colons or skin tones, e.g. `wave`

#### Defined in

[block-kit/block-elements.ts:854](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/block-elements.ts#L854)

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

[`RichTextStyleable`](RichTextStyleable.md).[`style`](RichTextStyleable.md#style)

#### Defined in

[block-kit/extensions.ts:86](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/extensions.ts#L86)

***

### type

```ts
type: "emoji";
```

#### Description

The type of element. In this case `type` is always `emoji`.

#### Defined in

[block-kit/block-elements.ts:850](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/block-elements.ts#L850)

***

### unicode?

```ts
optional unicode: string;
```

#### Description

Lowercase hexadecimal Unicode representation of a standard emoji (not for use with custom emoji).

#### Defined in

[block-kit/block-elements.ts:858](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/block-elements.ts#L858)

***

### url?

```ts
optional url: string;
```

#### Description

URL of emoji asset. Only used when sharing custom emoji across workspaces.

#### Defined in

[block-kit/block-elements.ts:862](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/block-elements.ts#L862)
