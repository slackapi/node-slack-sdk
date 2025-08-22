[@slack/web-api](../index.md) / RichTextEmoji

# Interface: RichTextEmoji

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:685

## Description

An emoji element for use in a rich text message.

## Extends

- [`RichTextStyleable`](RichTextStyleable.md)

## Properties

### name

```ts
name: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:693

#### Description

Name of emoji, without colons or skin tones, e.g. `wave`

***

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

### type

```ts
type: "emoji";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:689

#### Description

The type of element. In this case `type` is always `emoji`.

***

### unicode?

```ts
optional unicode: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:697

#### Description

Lowercase hexadecimal Unicode representation of a standard emoji (not for use with custom emoji).

***

### url?

```ts
optional url: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:701

#### Description

URL of emoji asset. Only used when sharing custom emoji across workspaces.
