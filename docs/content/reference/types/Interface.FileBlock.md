# Interface: FileBlock

## Description

Displays a [remote file](https://api.slack.com/messaging/files/remote). You can't add this block to
app surfaces directly, but it will show up when [retrieving messages](https://api.slack.com/messaging/retrieving)
that contain remote files. If you want to add remote files to messages,
[follow our guide](https://api.slack.com/messaging/files/remote).

## See

[File block reference](https://api.slack.com/reference/block-kit/blocks#file).

## Extends

- [`Block`](Interface.Block.md)

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

[`Block`](Interface.Block.md).[`block_id`](Interface.Block.md#block_id)

#### Defined in

[block-kit/blocks.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L44)

***

### external\_id

```ts
external_id: string;
```

#### Description

The external unique ID for this file.

#### Defined in

[block-kit/blocks.ts:136](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L136)

***

### source

```ts
source: string;
```

#### Description

At the moment, source will always be `remote` for a remote file.

#### Defined in

[block-kit/blocks.ts:132](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L132)

***

### type

```ts
type: "file";
```

#### Description

The type of block. For a file block, `type` is always `file`.

#### Overrides

[`Block`](Interface.Block.md).[`type`](Interface.Block.md#type)

#### Defined in

[block-kit/blocks.ts:128](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L128)
