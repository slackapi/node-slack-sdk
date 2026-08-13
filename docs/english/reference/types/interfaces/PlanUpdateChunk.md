[@slack/types](../index.md) / PlanUpdateChunk

# Interface: PlanUpdateChunk

Defined in: [chunk.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L35)

Used for displaying an updated title of a plan.
https://docs.slack.dev/messaging/sending-and-scheduling-messages#text-streaming

## Extends

- [`Chunk`](Chunk.md)

## Properties

### title

```ts
title: string;
```

Defined in: [chunk.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L37)

***

### type

```ts
type: "plan_update";
```

Defined in: [chunk.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/chunk.ts#L36)

#### Overrides

[`Chunk`](Chunk.md).[`type`](Chunk.md#type)
