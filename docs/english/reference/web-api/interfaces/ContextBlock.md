[@slack/web-api](../index.md) / ContextBlock

# Interface: ContextBlock

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:56

## Description

Displays contextual info, which can include both images and text.

## See

[Context block reference](https://api.slack.com/reference/block-kit/blocks#context).

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

### elements

```ts
elements: ContextBlockElement[];
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:65

#### Description

An array of [ImageElement](../type-aliases/ImageElement.md), [PlainTextElement](PlainTextElement.md) or [MrkdwnElement](MrkdwnElement.md) objects.
Maximum number of items is 10.

***

### type

```ts
type: "context";
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:60

#### Description

The type of block. For a context block, `type` is always `context`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
