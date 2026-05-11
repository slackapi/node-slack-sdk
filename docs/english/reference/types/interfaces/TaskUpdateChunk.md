[@slack/types](../index.md) / TaskUpdateChunk

# Interface: TaskUpdateChunk

Defined in: [chunk.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L44)

Used for displaying task progress in a timeline-style UI.
https://docs.slack.dev/messaging/sending-and-scheduling-messages#text-streaming

## Extends

- [`Chunk`](Chunk.md)

## Properties

### details?

```ts
optional details: string;
```

Defined in: [chunk.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L49)

***

### id

```ts
id: string;
```

Defined in: [chunk.ts:46](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L46)

***

### output?

```ts
optional output: string;
```

Defined in: [chunk.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L50)

***

### sources?

```ts
optional sources: URLSourceElement[];
```

Defined in: [chunk.ts:51](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L51)

***

### status

```ts
status: "error" | "pending" | "in_progress" | "complete";
```

Defined in: [chunk.ts:48](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L48)

***

### title

```ts
title: string;
```

Defined in: [chunk.ts:47](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L47)

***

### type

```ts
type: "task_update";
```

Defined in: [chunk.ts:45](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L45)

#### Overrides

[`Chunk`](Chunk.md).[`type`](Chunk.md#type)
