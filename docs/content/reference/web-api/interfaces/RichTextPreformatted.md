# Interface: RichTextPreformatted

## Description

A block of preformatted text within a rich text field.

## Properties

### border?

```ts
optional border: 0 | 1;
```

#### Description

Whether to render a quote-block-like border on the inline side of the preformatted text.
`0` renders no border, while `1` renders a border. Defaults to `0`.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:886

***

### elements

```ts
elements: (RichTextLink | RichTextText)[];
```

#### Description

An array of either [RichTextLink](RichTextLink.md) or [RichTextText](RichTextText.md) comprising the preformatted text.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:881

***

### type

```ts
type: "rich_text_preformatted";
```

#### Description

The type of element. In this case `type` is always `rich_text_preformatted`.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:877
