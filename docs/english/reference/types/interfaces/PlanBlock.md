[@slack/types](../index.md) / PlanBlock

# Interface: PlanBlock

Defined in: [block-kit/blocks.ts:453](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L453)

## Description

A collection of related tasks.

## See

https://docs.slack.dev/reference/block-kit/blocks/plan-block/

## Extends

- [`Block`](Block.md)

## Properties

### block\_id?

```ts
optional block_id: string;
```

Defined in: [block-kit/blocks.ts:48](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L48)

#### Description

A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
You can use this `block_id` when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

***

### tasks?

```ts
optional tasks: (TaskCardBlock | Record<string, unknown>)[];
```

Defined in: [block-kit/blocks.ts:467](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L467)

#### Description

A sequence of task card blocks. Each task represents a single action within the plan.

***

### title

```ts
title: string;
```

Defined in: [block-kit/blocks.ts:462](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L462)

#### Description

Title of the plan in plain text.

***

### type

```ts
type: "plan";
```

Defined in: [block-kit/blocks.ts:457](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L457)

#### Description

The type of block. In this case `type` is always `plan`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
