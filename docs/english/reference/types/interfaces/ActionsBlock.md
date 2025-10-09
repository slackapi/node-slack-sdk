[@slack/types](../index.md) / ActionsBlock

# Interface: ActionsBlock

Defined in: [block-kit/blocks.ts:89](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L89)

## Description

Holds multiple interactive elements.

## See

[Actions block reference](https://docs.slack.dev/reference/block-kit/blocks/actions-block).

## Extends

- [`Block`](Block.md)

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

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

***

### elements

```ts
elements: ActionsBlockElement[];
```

Defined in: [block-kit/blocks.ts:98](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L98)

#### Description

An array of InteractiveElements objects.
There is a maximum of 25 elements in each action block.

***

### type

```ts
type: "actions";
```

Defined in: [block-kit/blocks.ts:93](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L93)

#### Description

The type of block. For an actions block, `type` is always `actions`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
