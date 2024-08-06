# Interface: Block

## Extended by

- [`ActionsBlock`](Interface.ActionsBlock.md)
- [`ContextBlock`](Interface.ContextBlock.md)
- [`DividerBlock`](Interface.DividerBlock.md)
- [`FileBlock`](Interface.FileBlock.md)
- [`HeaderBlock`](Interface.HeaderBlock.md)
- [`InputBlock`](Interface.InputBlock.md)
- [`SectionBlock`](Interface.SectionBlock.md)
- [`VideoBlock`](Interface.VideoBlock.md)
- [`RichTextBlock`](Interface.RichTextBlock.md)

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

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:13

***

### type

```ts
type: string;
```

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:5
