[@slack/types](../index.md) / ContextBlock

# Interface: ContextBlock

Defined in: [block-kit/blocks.ts:111](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L111)

## Description

Displays contextual info, which can include both images and text.

## See

[Context block reference](https://docs.slack.dev/reference/block-kit/blocks/context-block).

## Extends

- [`Block`](Block.md)

## Properties

### block\_id?

```ts
optional block_id: string;
```

Defined in: [block-kit/blocks.ts:41](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L41)

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
elements: ContextBlockElement[];
```

Defined in: [block-kit/blocks.ts:120](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L120)

#### Description

An array of [ImageElement](../type-aliases/ImageElement.md), [PlainTextElement](PlainTextElement.md) or [MrkdwnElement](MrkdwnElement.md) objects.
Maximum number of items is 10.

***

### type

```ts
type: "context";
```

Defined in: [block-kit/blocks.ts:115](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L115)

#### Description

The type of block. For a context block, `type` is always `context`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
