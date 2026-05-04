[@slack/types](../index.md) / PlanUpdateChunk

# Interface: PlanUpdateChunk

Defined in: [chunk.ts:23](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L23)

Used for displaying an updated title of a plan.
https://docs.slack.dev/messaging/sending-and-scheduling-messages#text-streaming

## Extends

- [`Chunk`](Chunk.md)

## Properties

### title

```ts
title: string;
```

Defined in: [chunk.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L25)

***

### type

```ts
type: "plan_update";
```

Defined in: [chunk.ts:24](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L24)

#### Overrides

[`Chunk`](Chunk.md).[`type`](Chunk.md#type)
