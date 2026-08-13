[@slack/web-api](../index.md) / TaskUpdateChunk

# Interface: TaskUpdateChunk

Defined in: packages/types/dist/chunk.d.ts:39

Used for displaying task progress in a timeline-style UI.
https://docs.slack.dev/messaging/sending-and-scheduling-messages#text-streaming

## Extends

- [`Chunk`](Chunk.md)

## Properties

### details?

```ts
optional details: string;
```

Defined in: packages/types/dist/chunk.d.ts:44

***

### id

```ts
id: string;
```

Defined in: packages/types/dist/chunk.d.ts:41

***

### output?

```ts
optional output: string;
```

Defined in: packages/types/dist/chunk.d.ts:45

***

### sources?

```ts
optional sources: URLSourceElement[];
```

Defined in: packages/types/dist/chunk.d.ts:46

***

### status

```ts
status: "error" | "pending" | "in_progress" | "complete";
```

Defined in: packages/types/dist/chunk.d.ts:43

***

### title

```ts
title: string;
```

Defined in: packages/types/dist/chunk.d.ts:42

***

### type

```ts
type: "task_update";
```

Defined in: packages/types/dist/chunk.d.ts:40

#### Overrides

[`Chunk`](Chunk.md).[`type`](Chunk.md#type)
