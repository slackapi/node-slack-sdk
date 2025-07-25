[@slack/web-api](../index.md) / RichTextUsergroupMention

# Interface: RichTextUsergroupMention

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:766

## Description

A usergroup mention element for use in a rich text message.

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

### type

```ts
type: "usergroup";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:770

#### Description

The type of element. In this case `type` is always `usergroup`.

***

### usergroup\_id

```ts
usergroup_id: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:774

#### Description

The encoded usergroup ID, e.g. S1234ABCD.
