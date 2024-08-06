# Interface: HeaderBlock

## Description

Displays a larger-sized text block. A `header` is a plain-text block that displays in a larger, bold
font. Use it to delineate between different groups of content in your app's surfaces.

## See

[Header block reference](https://api.slack.com/reference/block-kit/blocks#header).

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

### text

```ts
text: PlainTextElement;
```

#### Description

The text for the block, in the form of a [PlainTextElement](Interface.PlainTextElement.md).
Maximum length for the text in this field is 150 characters.

#### Defined in

[block-kit/blocks.ts:153](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L153)

***

### type

```ts
type: "header";
```

#### Description

The type of block. For a header block, `type` is always `header`.

#### Overrides

[`Block`](Interface.Block.md).[`type`](Interface.Block.md#type)

#### Defined in

[block-kit/blocks.ts:148](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L148)
