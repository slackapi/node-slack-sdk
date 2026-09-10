[@slack/types](../index.md) / ContainerBlock

# Interface: ContainerBlock

Defined in: [block-kit/blocks.ts:194](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L194)

## Description

A general-purpose wrapper for grouping child blocks together, with a configurable size.

## See

[Container block reference](https://docs.slack.dev/reference/block-kit/blocks/container-block).

## Extends

- [`Block`](Block.md)

## Properties

### block\_id?

```ts
optional block_id?: string;
```

Defined in: [block-kit/blocks.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L50)

#### Description

A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
You can use this `block_id` when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

***

### child\_blocks

```ts
child_blocks: (
  | RichTextBlock
  | ActionsBlock
  | ContextBlock
  | DividerBlock
  | FileBlock
  | HeaderBlock
  | ImageBlock
  | InputBlock
  | SectionBlock
  | TableBlock
  | VideoBlock)[];
```

Defined in: [block-kit/blocks.ts:216](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L216)

#### Description

An array of child blocks. Maximum 10 blocks.

***

### default\_collapsed?

```ts
optional default_collapsed?: boolean;
```

Defined in: [block-kit/blocks.ts:244](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L244)

#### Description

Whether the container is collapsed by default. Requires `is_collapsible` to be `true`. Defaults to `false`.

***

### has\_header\_divider?

```ts
optional has_header_divider?: boolean;
```

Defined in: [block-kit/blocks.ts:249](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L249)

#### Description

Whether to show a visible border separating header from content.
Only applies when `is_collapsible` is not `true`. Defaults to `false`.

***

### icon?

```ts
optional icon?: ImageElement;
```

Defined in: [block-kit/blocks.ts:236](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L236)

#### Description

An image element displayed alongside the title and subtitle.

***

### is\_collapsible?

```ts
optional is_collapsible?: boolean;
```

Defined in: [block-kit/blocks.ts:240](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L240)

#### Description

Whether the container can be collapsed. Defaults to `false`.

***

### rich\_text\_title?

```ts
optional rich_text_title?: RichTextBlock;
```

Defined in: [block-kit/blocks.ts:208](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L208)

#### Description

Rich text title for the container. Takes precedence over `title` if both are provided.
One of `title` or `rich_text_title` is required.

***

### subtitle?

```ts
optional subtitle?: TextObject;
```

Defined in: [block-kit/blocks.ts:212](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L212)

#### Description

Subtitle for the container in plain text or mrkdwn format. Maximum length is 150 characters.

***

### title?

```ts
optional title?: PlainTextElement;
```

Defined in: [block-kit/blocks.ts:203](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L203)

#### Description

Plain text title for the container. Maximum length is 150 characters.
One of `title` or `rich_text_title` is required.

***

### type

```ts
type: "container";
```

Defined in: [block-kit/blocks.ts:198](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L198)

#### Description

The type of block. For a container block, `type` is always `container`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)

***

### width?

```ts
optional width?: "narrow" | "standard" | "wide" | "full";
```

Defined in: [block-kit/blocks.ts:232](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L232)

#### Description

Controls the width of the container. Defaults to `"standard"`.
