[@slack/web-api](../index.md) / DividerBlock

# Interface: DividerBlock

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:72

## Description

Visually separates pieces of info inside of a message. A content divider, like an `<hr>`, to split up
different blocks inside of a message. The divider block is nice and neat, requiring only a `type`.

## See

[Divider block reference](https://api.slack.com/reference/block-kit/blocks#divider).

## Extends

- [`Block`](Block.md)

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

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

***

### type

```ts
type: "divider";
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:76

#### Description

The type of block. For a divider block, `type` is always `divider`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
