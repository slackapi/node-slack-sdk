[@slack/types](../index.md) / TaskUpdateChunk

# Interface: TaskUpdateChunk

Defined in: [chunk.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L32)

Used for displaying task progress in a timeline-style UI.
https://docs.slack.dev/messaging/sending-and-scheduling-messages#text-streaming

## Extends

- [`Chunk`](Chunk.md)

## Properties

### details?

```ts
optional details: string;
```

Defined in: [chunk.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L37)

***

### id

```ts
id: string;
```

Defined in: [chunk.ts:34](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L34)

***

### output?

```ts
optional output: string;
```

Defined in: [chunk.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L38)

***

### sources?

```ts
optional sources: URLSourceElement[];
```

Defined in: [chunk.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L39)

***

### status

```ts
status: "pending" | "in_progress" | "complete" | "error";
```

Defined in: [chunk.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L36)

***

### title

```ts
title: string;
```

Defined in: [chunk.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L35)

***

### type

```ts
type: "task_update";
```

Defined in: [chunk.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L33)

#### Overrides

[`Chunk`](Chunk.md).[`type`](Chunk.md#type)
