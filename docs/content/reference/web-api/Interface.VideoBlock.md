# Interface: VideoBlock

## Description

Displays an embedded video player. A video block is designed to embed videos in all app surfaces (e.g.
link unfurls, messages, modals, App Home) — anywhere you can put blocks! To use the video block within your app, you
must have the [`links.embed:write` scope](https://api.slack.com/scopes/links.embed:write).

## See

[Video block reference](https://api.slack.com/reference/block-kit/blocks#video).

## Extends

- [`Block`](Interface.Block.md)

## Properties

### alt\_text

```ts
alt_text: string;
```

#### Description

A tooltip for the video. Required for accessibility.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:203

***

### author\_name?

```ts
optional author_name: string;
```

#### Description

Author name to be displayed. Must be less than 50 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:216

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

[`Block`](Interface.Block.md).[`block_id`](Interface.Block.md#block_id)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:13

***

### description?

```ts
optional description: PlainTextElement;
```

#### Description

Description for video using a [PlainTextElement](Interface.PlainTextElement.md) object.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:228

***

### provider\_icon\_url?

```ts
optional provider_icon_url: string;
```

#### Description

Icon for the video provider, e.g. YouTube icon.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:224

***

### provider\_name?

```ts
optional provider_name: string;
```

#### Description

The originating application or domain of the video, e.g. YouTube.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:220

***

### thumbnail\_url

```ts
thumbnail_url: string;
```

#### Description

The thumbnail image URL.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:199

***

### title

```ts
title: PlainTextElement;
```

#### Description

Video title as a [PlainTextElement](Interface.PlainTextElement.md) object. `text` within must be less than 200 characters.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:207

***

### title\_url?

```ts
optional title_url: string;
```

#### Description

Hyperlink for the title text. Must correspond to the non-embeddable URL for the video.
Must go to an HTTPS URL.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:212

***

### type

```ts
type: "video";
```

#### Description

The type of block. For a video block, `type` is always `video`.

#### Overrides

[`Block`](Interface.Block.md).[`type`](Interface.Block.md#type)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:189

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

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:195
