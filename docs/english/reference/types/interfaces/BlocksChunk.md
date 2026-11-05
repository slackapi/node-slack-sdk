[@slack/types](../index.md) / BlocksChunk

# Interface: BlocksChunk

Defined in: [chunk.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L16)

Used for passing an array of blocks within a streaming message.
https://docs.slack.dev/changelog/2026/04/16/block-kit-new-blocks/

## Extends

- [`Chunk`](Chunk.md)

## Properties

### blocks

```ts
blocks: AnyBlock[];
```

Defined in: [chunk.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L19)

#### Description

An array of [AnyBlock](../type-aliases/AnyBlock.md) objects. Maximum of 50 blocks.

***

### type

```ts
type: "blocks";
```

Defined in: [chunk.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L17)

#### Overrides

[`Chunk`](Chunk.md).[`type`](Chunk.md#type)
