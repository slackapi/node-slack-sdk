[@slack/types](../index.md) / MarkdownBlock

# Interface: MarkdownBlock

Defined in: [block-kit/blocks.ts:255](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L255)

## Description

This block can be used with AI apps when you expect a markdown response from an LLM that can get lost in
translation rendering in Slack. Providing it in a markdown block leaves the translating to Slack to ensure your message
appears as intended. Note that passing a single block may result in multiple blocks after translation.

## See

[Markdown block reference](https://api.slack.com/reference/block-kit/blocks#markdown).

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
text: string;
```

Defined in: [block-kit/blocks.ts:263](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L263)

#### Description

The standard markdown-formatted text. Limit 12,000 characters max.

***

### type

```ts
type: "markdown";
```

Defined in: [block-kit/blocks.ts:259](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L259)

#### Description

The type of block. For a markdown block, `type` is always `markdown`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
