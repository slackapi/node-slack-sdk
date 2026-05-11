[@slack/web-api](../index.md) / CarouselBlock

# Interface: CarouselBlock

Defined in: packages/types/dist/block-kit/blocks.d.ts:106

## Description

Displays related card blocks in a horizontally-scrolling container.

## See

[Carousel block reference](https://docs.slack.dev/reference/block-kit/blocks/carousel-block).

## Extends

- [`Block`](Block.md)

## Properties

### block\_id?

```ts
optional block_id: string;
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:15

#### Description

A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
You can use this `block_id` when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

***

### elements

```ts
elements: CardBlock[];
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:114

#### Description

An array of [CardBlock](CardBlock.md) elements. Minimum 1, maximum 10 cards.

***

### type

```ts
type: "carousel";
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:110

#### Description

The type of block. For a carousel block, `type` is always `carousel`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
