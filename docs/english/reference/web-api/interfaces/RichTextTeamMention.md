[@slack/web-api](../index.md) / RichTextTeamMention

# Interface: RichTextTeamMention

Defined in: packages/types/dist/block-kit/block-elements.d.ts:825

## Description

A workspace or team mention element for use in a rich text message.

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

### team\_id

```ts
team_id: string;
```

Defined in: packages/types/dist/block-kit/block-elements.d.ts:833

#### Description

The encoded team ID, e.g. T1234ABCD.

***

### type

```ts
type: "team";
```

Defined in: packages/types/dist/block-kit/block-elements.d.ts:829

#### Description

The type of element. In this case `type` is always `team`.
