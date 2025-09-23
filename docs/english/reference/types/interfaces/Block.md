[@slack/types](../index.md) / Block

# Interface: Block

Defined in: [block-kit/blocks.ts:29](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L29)

## Extended by

- [`ActionsBlock`](ActionsBlock.md)
- [`ContextBlock`](ContextBlock.md)
- [`ContextActionsBlock`](ContextActionsBlock.md)
- [`DividerBlock`](DividerBlock.md)
- [`FileBlock`](FileBlock.md)
- [`HeaderBlock`](HeaderBlock.md)
- [`InputBlock`](InputBlock.md)
- [`MarkdownBlock`](MarkdownBlock.md)
- [`RichTextBlock`](RichTextBlock.md)
- [`SectionBlock`](SectionBlock.md)
- [`VideoBlock`](VideoBlock.md)

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

***

### type

```ts
type: string;
```

Defined in: [block-kit/blocks.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L33)

#### Description

The type of block.
