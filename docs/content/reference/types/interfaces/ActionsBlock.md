# Interface: ActionsBlock

## Description

Holds multiple interactive elements.

## See

[Actions block reference](https://api.slack.com/reference/block-kit/blocks#actions).

## Extends

- [`Block`](Block.md)

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

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

#### Defined in

[block-kit/blocks.ts:44](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/blocks.ts#L44)

***

### elements

```ts
elements: ActionsBlockElement[];
```

#### Description

An array of InteractiveElements objects.
There is a maximum of 25 elements in each action block.

#### Defined in

[block-kit/blocks.ts:80](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/blocks.ts#L80)

***

### type

```ts
type: "actions";
```

#### Description

The type of block. For an actions block, `type` is always `actions`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)

#### Defined in

[block-kit/blocks.ts:75](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/block-kit/blocks.ts#L75)
