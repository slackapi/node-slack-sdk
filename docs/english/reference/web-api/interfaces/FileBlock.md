[@slack/web-api](../index.md) / FileBlock

# Interface: FileBlock

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:102

## Description

Displays a [remote file](https://docs.slack.dev/messaging/working-with-files#remote). You can't add this block to
app surfaces directly, but it will show up when [retrieving messages](https://docs.slack.dev/messaging/retrieving-messages)
that contain remote files. If you want to add remote files to messages,
[follow our guide](https://docs.slack.dev/messaging/working-with-files#remote).

## See

[File block reference](https://docs.slack.dev/reference/block-kit/blocks/file-block).

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
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

***

### external\_id

```ts
external_id: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:114

#### Description

The external unique ID for this file.

***

### source

```ts
source: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:110

#### Description

At the moment, source will always be `remote` for a remote file.

***

### type

```ts
type: "file";
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:106

#### Description

The type of block. For a file block, `type` is always `file`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
