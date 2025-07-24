[@slack/web-api](../index.md) / RichTextTeamMention

# Interface: RichTextTeamMention

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:727

## Description

A workspace or team mention element for use in a rich text message.

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

### team\_id

```ts
team_id: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:735

#### Description

The encoded team ID, e.g. T1234ABCD.

***

### type

```ts
type: "team";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:731

#### Description

The type of element. In this case `type` is always `team`.
