[@slack/types](../index.md) / HeaderBlock

# Interface: HeaderBlock

Defined in: [block-kit/blocks.ts:159](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L159)

## Description

Displays a larger-sized text block. A `header` is a plain-text block that displays in a larger, bold
font. Use it to delineate between different groups of content in your app's surfaces.

## See

[Header block reference](https://docs.slack.dev/reference/block-kit/blocks/header-block).

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

### text

```ts
text: PlainTextElement;
```

Defined in: [block-kit/blocks.ts:168](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L168)

#### Description

The text for the block, in the form of a [PlainTextElement](PlainTextElement.md).
Maximum length for the text in this field is 150 characters.

***

### type

```ts
type: "header";
```

Defined in: [block-kit/blocks.ts:163](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L163)

#### Description

The type of block. For a header block, `type` is always `header`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
