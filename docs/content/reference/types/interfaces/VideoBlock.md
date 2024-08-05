# Interface: VideoBlock

## Description

Displays an embedded video player. A video block is designed to embed videos in all app surfaces (e.g.
link unfurls, messages, modals, App Home) — anywhere you can put blocks! To use the video block within your app, you
must have the [`links.embed:write` scope](https://api.slack.com/scopes/links.embed:write).

## See

[Video block reference](https://api.slack.com/reference/block-kit/blocks#video).

## Extends

- [`Block`](Block.md)

## Properties

### alt\_text

```ts
alt_text: string;
```

#### Description

A tooltip for the video. Required for accessibility.

#### Defined in

[block-kit/blocks.ts:307](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L307)

***

### author\_name?

```ts
optional author_name: string;
```

#### Description

Author name to be displayed. Must be less than 50 characters.

#### Defined in

[block-kit/blocks.ts:320](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L320)

***

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

[block-kit/blocks.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L44)

***

### description?

```ts
optional description: PlainTextElement;
```

#### Description

Description for video using a [PlainTextElement](PlainTextElement.md) object.

#### Defined in

[block-kit/blocks.ts:332](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L332)

***

### provider\_icon\_url?

```ts
optional provider_icon_url: string;
```

#### Description

Icon for the video provider, e.g. YouTube icon.

#### Defined in

[block-kit/blocks.ts:328](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L328)

***

### provider\_name?

```ts
optional provider_name: string;
```

#### Description

The originating application or domain of the video, e.g. YouTube.

#### Defined in

[block-kit/blocks.ts:324](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L324)

***

### thumbnail\_url

```ts
thumbnail_url: string;
```

#### Description

The thumbnail image URL.

#### Defined in

[block-kit/blocks.ts:303](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L303)

***

### title

```ts
title: PlainTextElement;
```

#### Description

Video title as a [PlainTextElement](PlainTextElement.md) object. `text` within must be less than 200 characters.

#### Defined in

[block-kit/blocks.ts:311](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L311)

***

### title\_url?

```ts
optional title_url: string;
```

#### Description

Hyperlink for the title text. Must correspond to the non-embeddable URL for the video.
Must go to an HTTPS URL.

#### Defined in

[block-kit/blocks.ts:316](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L316)

***

### type

```ts
type: "video";
```

#### Description

The type of block. For a video block, `type` is always `video`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)

#### Defined in

[block-kit/blocks.ts:293](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L293)

***

### video\_url

```ts
video_url: string;
```

#### Description

The URL to be embedded. Must match any existing
[unfurl domains](https://api.slack.com/reference/messaging/link-unfurling#configuring_domains) within the app
and point to a HTTPS URL.

#### Defined in

[block-kit/blocks.ts:299](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L299)
