[@slack/types](../index.md) / RichTextBlock

# Interface: RichTextBlock

Defined in: [block-kit/blocks.ts:281](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L281)

## Description

Displays formatted, structured representation of text. It is also the output of the Slack client's
WYSIWYG message composer, so all messages sent by end-users will have this format. Use this block to include
user-defined formatted text in your Block Kit payload. While it is possible to format text with `mrkdwn`,
`rich_text` is strongly preferred and allows greater flexibility.
You might encounter a `rich_text` block in a message payload, as a built-in type in workflow apps, or as output of
the [RichTextInput](RichTextInput.md).

## See

[Rich text block reference](https://docs.slack.dev/reference/block-kit/blocks/rich-text-block).

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

### elements

```ts
elements: RichTextBlockElement[];
```

Defined in: [block-kit/blocks.ts:286](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L286)

***

### type

```ts
type: "rich_text";
```

Defined in: [block-kit/blocks.ts:285](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L285)

#### Description

The type of block. For a rich text block, `type` is always `rich_text`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
