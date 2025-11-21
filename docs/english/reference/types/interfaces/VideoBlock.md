[@slack/types](../index.md) / VideoBlock

# Interface: VideoBlock

Defined in: [block-kit/blocks.ts:411](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L411)

## Description

Displays an embedded video player. A video block is designed to embed videos in all app surfaces (e.g.
link unfurls, messages, modals, App Home) — anywhere you can put blocks! To use the video block within your app, you
must have the [\`links.embed:write\` scope](https://docs.slack.dev/reference/scopes/links.embed.write).

## See

[Video block reference](https://docs.slack.dev/reference/block-kit/blocks/video-block).

## Extends

- [`Block`](Block.md)

## Properties

### alt\_text

```ts
alt_text: string;
```

Defined in: [block-kit/blocks.ts:429](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L429)

#### Description

A tooltip for the video. Required for accessibility.

***

### author\_name?

```ts
optional author_name: string;
```

Defined in: [block-kit/blocks.ts:442](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L442)

#### Description

Author name to be displayed. Must be less than 50 characters.

***

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

### description?

```ts
optional description: PlainTextElement;
```

Defined in: [block-kit/blocks.ts:454](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L454)

#### Description

Description for video using a [PlainTextElement](PlainTextElement.md) object.

***

### provider\_icon\_url?

```ts
optional provider_icon_url: string;
```

Defined in: [block-kit/blocks.ts:450](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L450)

#### Description

Icon for the video provider, e.g. YouTube icon.

***

### provider\_name?

```ts
optional provider_name: string;
```

Defined in: [block-kit/blocks.ts:446](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L446)

#### Description

The originating application or domain of the video, e.g. YouTube.

***

### thumbnail\_url

```ts
thumbnail_url: string;
```

Defined in: [block-kit/blocks.ts:425](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L425)

#### Description

The thumbnail image URL.

***

### title

```ts
title: PlainTextElement;
```

Defined in: [block-kit/blocks.ts:433](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L433)

#### Description

Video title as a [PlainTextElement](PlainTextElement.md) object. `text` within must be less than 200 characters.

***

### title\_url?

```ts
optional title_url: string;
```

Defined in: [block-kit/blocks.ts:438](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L438)

#### Description

Hyperlink for the title text. Must correspond to the non-embeddable URL for the video.
Must go to an HTTPS URL.

***

### type

```ts
type: "video";
```

Defined in: [block-kit/blocks.ts:415](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L415)

#### Description

The type of block. For a video block, `type` is always `video`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)

***

### video\_url

```ts
video_url: string;
```

Defined in: [block-kit/blocks.ts:421](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L421)

#### Description

The URL to be embedded. Must match any existing
[unfurl domains](https://docs.slack.dev/messaging/unfurling-links-in-messages) within the app
and point to a HTTPS URL.
