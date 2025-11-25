[@slack/types](../index.md) / ContextActionsBlock

# Interface: ContextActionsBlock

Defined in: [block-kit/blocks.ts:139](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L139)

## Description

Displays actions as contextual info, which can include both feedback buttons and icon buttons.

## See

[Context actions block reference](https://docs.slack.dev/reference/block-kit/blocks/context-actions-block).

## Extends

- [`Block`](Block.md)

## Properties

### block\_id?

```ts
optional block_id: string;
```

Defined in: [block-kit/blocks.ts:47](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L47)

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
elements: ContextActionsBlockElement[];
```

Defined in: [block-kit/blocks.ts:147](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L147)

#### Description

An array of [FeedbackButtons](FeedbackButtons.md) or [IconButton](IconButton.md) block elements. Maximum number of items is 5.

***

### type

```ts
type: "context_actions";
```

Defined in: [block-kit/blocks.ts:143](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L143)

#### Description

The type of block. For a context actions block, `type` is always `context_actions`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
