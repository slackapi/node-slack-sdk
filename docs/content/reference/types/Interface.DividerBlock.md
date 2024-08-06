# Interface: DividerBlock

## Description

Visually separates pieces of info inside of a message. A content divider, like an `<hr>`, to split up
different blocks inside of a message. The divider block is nice and neat, requiring only a `type`.

## See

[Divider block reference](https://api.slack.com/reference/block-kit/blocks#divider).

## Extends

- [`Block`](Interface.Block.md)

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

[`Block`](Interface.Block.md).[`block_id`](Interface.Block.md#block_id)

#### Defined in

[block-kit/blocks.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L44)

***

### type

```ts
type: "divider";
```

#### Description

The type of block. For a divider block, `type` is always `divider`.

#### Overrides

[`Block`](Interface.Block.md).[`type`](Interface.Block.md#type)

#### Defined in

[block-kit/blocks.ts:114](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L114)
