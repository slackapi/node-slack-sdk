[@slack/web-api](../index.md) / Block

# Interface: Block

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:3

## Extended by

- [`ActionsBlock`](ActionsBlock.md)
- [`ContextBlock`](ContextBlock.md)
- [`DividerBlock`](DividerBlock.md)
- [`FileBlock`](FileBlock.md)
- [`HeaderBlock`](HeaderBlock.md)
- [`InputBlock`](InputBlock.md)
- [`RichTextBlock`](RichTextBlock.md)
- [`SectionBlock`](SectionBlock.md)
- [`VideoBlock`](VideoBlock.md)

## Properties

### block\_id?

```ts
optional block_id: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:15

#### Description

A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
You can use this `block_id` when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

***

### type

```ts
type: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:7

#### Description

The type of block.
