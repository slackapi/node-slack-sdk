# Interface: RichTextBlock

## Extends

- [`Block`](Block.md)

## Properties

### block\_id?

```ts
optional block_id: string;
```

#### Description

A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
You can use this `block_id` when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:13

***

### elements

```ts
elements: (RichTextSection | RichTextList | RichTextQuote | RichTextPreformatted)[];
```

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:235

***

### type

```ts
type: "rich_text";
```

#### Description

The type of block. For a rich text block, `type` is always `rich_text`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:234
