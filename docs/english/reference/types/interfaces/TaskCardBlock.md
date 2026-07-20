[@slack/types](../index.md) / TaskCardBlock

# Interface: TaskCardBlock

Defined in: [block-kit/blocks.ts:488](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L488)

## Description

A discrete task or tool call.

## See

https://docs.slack.dev/reference/block-kit/blocks/task-card-block/

## Extends

- [`Block`](Block.md)

## Properties

### block\_id?

```ts
optional block_id: string;
```

Defined in: [block-kit/blocks.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L49)

#### Description

A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
You can use this `block_id` when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

***

### details?

```ts
optional details: RichTextBlock;
```

Defined in: [block-kit/blocks.ts:507](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L507)

#### Description

Details of the task in the form of a single "rich_text" entity.

***

### output?

```ts
optional output: RichTextBlock;
```

Defined in: [block-kit/blocks.ts:512](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L512)

#### Description

Output of the task in the form of a single "rich_text" entity.

***

### sources?

```ts
optional sources: URLSourceElement[];
```

Defined in: [block-kit/blocks.ts:517](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L517)

#### Description

Array of URL source elements used to generate a response.

***

### status

```ts
status: "error" | "pending" | "in_progress" | "complete";
```

Defined in: [block-kit/blocks.ts:522](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L522)

#### Description

The state of a task. Can be "pending", "in_progress", "complete", or "error".

***

### task\_id

```ts
task_id: string;
```

Defined in: [block-kit/blocks.ts:497](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L497)

#### Description

ID for the task.

***

### title

```ts
title: string;
```

Defined in: [block-kit/blocks.ts:502](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L502)

#### Description

Title of the task in plain text.

***

### type

```ts
type: "task_card";
```

Defined in: [block-kit/blocks.ts:492](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L492)

#### Description

The type of block. For this block, type will always be `task_card`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
