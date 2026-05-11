[@slack/web-api](../index.md) / BlocksChunk

# Interface: BlocksChunk

Defined in: packages/types/dist/chunk.d.ts:14

Used for passing an array of blocks within a streaming message.
https://docs.slack.dev/changelog/2026/04/16/block-kit-new-blocks/

## Extends

- [`Chunk`](Chunk.md)

## Properties

### blocks

```ts
blocks: AnyBlock[];
```

Defined in: packages/types/dist/chunk.d.ts:17

#### Description

An array of [AnyBlock](../type-aliases/AnyBlock.md) objects. Maximum of 50 blocks.

***

### type

```ts
type: "blocks";
```

Defined in: packages/types/dist/chunk.d.ts:15

#### Overrides

[`Chunk`](Chunk.md).[`type`](Chunk.md#type)
