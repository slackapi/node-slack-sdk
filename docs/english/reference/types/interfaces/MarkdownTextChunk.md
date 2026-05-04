[@slack/types](../index.md) / MarkdownTextChunk

# Interface: MarkdownTextChunk

Defined in: [chunk.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L14)

Used for streaming text content with markdown formatting support.
https://docs.slack.dev/messaging/sending-and-scheduling-messages#text-streaming

## Extends

- [`Chunk`](Chunk.md)

## Properties

### text

```ts
text: string;
```

Defined in: [chunk.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L16)

***

### type

```ts
type: "markdown_text";
```

Defined in: [chunk.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L15)

#### Overrides

[`Chunk`](Chunk.md).[`type`](Chunk.md#type)
