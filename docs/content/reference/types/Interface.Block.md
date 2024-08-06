# Interface: Block

## Extended by

- [`ActionsBlock`](Interface.ActionsBlock.md)
- [`ContextBlock`](Interface.ContextBlock.md)
- [`DividerBlock`](Interface.DividerBlock.md)
- [`FileBlock`](Interface.FileBlock.md)
- [`HeaderBlock`](Interface.HeaderBlock.md)
- [`InputBlock`](Interface.InputBlock.md)
- [`RichTextBlock`](Interface.RichTextBlock.md)
- [`SectionBlock`](Interface.SectionBlock.md)
- [`VideoBlock`](Interface.VideoBlock.md)

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

#### Defined in

[block-kit/blocks.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L44)

***

### type

```ts
type: string;
```

#### Description

The type of block.

#### Defined in

[block-kit/blocks.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L36)
