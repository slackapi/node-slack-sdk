[@slack/types](../index.md) / DividerBlock

# Interface: DividerBlock

Defined in: [block-kit/blocks.ts:125](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L125)

## Description

Visually separates pieces of info inside of a message. A content divider, like an `<hr>`, to split up
different blocks inside of a message. The divider block is nice and neat, requiring only a `type`.

## See

[Divider block reference](https://docs.slack.dev/reference/block-kit/blocks/divider-block).

## Extends

- [`Block`](Block.md)

## Properties

### block\_id?

```ts
optional block_id: string;
```

Defined in: [block-kit/blocks.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L39)

#### Description

A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
You can use this `block_id` when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

***

### type

```ts
type: "divider";
```

Defined in: [block-kit/blocks.ts:129](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L129)

#### Description

The type of block. For a divider block, `type` is always `divider`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
