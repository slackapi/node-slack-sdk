[@slack/web-api](../index.md) / RichTextBlock

# Interface: RichTextBlock

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:190

## Description

Displays formatted, structured representation of text. It is also the output of the Slack client's
WYSIWYG message composer, so all messages sent by end-users will have this format. Use this block to include
user-defined formatted text in your Block Kit payload. While it is possible to format text with `mrkdwn`,
`rich_text` is strongly preferred and allows greater flexibility.
You might encounter a `rich_text` block in a message payload, as a built-in type in workflow apps, or as output of
the [RichTextInput](RichTextInput.md).

## See

[Rich text block reference](https://api.slack.com/reference/block-kit/blocks#rich_text).

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
elements: RichTextBlockElement[];
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:195

***

### type

```ts
type: "rich_text";
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:194

#### Description

The type of block. For a rich text block, `type` is always `rich_text`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
