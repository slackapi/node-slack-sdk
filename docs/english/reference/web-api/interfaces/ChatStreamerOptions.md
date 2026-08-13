[@slack/web-api](../index.md) / ChatStreamerOptions

# Interface: ChatStreamerOptions

Defined in: [packages/web-api/src/chat-stream.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/chat-stream.ts#L7)

## Properties

### buffer\_size?

```ts
optional buffer_size: number;
```

Defined in: [packages/web-api/src/chat-stream.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/chat-stream.ts#L12)

#### Description

The length of markdown_text to buffer in-memory before calling a method. Increasing this value decreases the number of method calls made for the same amount of text, which is useful to avoid rate limits.

#### Default

```ts
256
```
