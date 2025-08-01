[@slack/types](../index.md) / AssistantThreadStartedEvent

# Interface: AssistantThreadStartedEvent

Defined in: [events/assistant.ts:1](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/assistant.ts#L1)

## Properties

### assistant\_thread

```ts
assistant_thread: object;
```

Defined in: [events/assistant.ts:3](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/assistant.ts#L3)

#### channel\_id

```ts
channel_id: string;
```

#### context

```ts
context: object;
```

##### context.channel\_id?

```ts
optional channel_id: string;
```

##### context.enterprise\_id?

```ts
optional enterprise_id: null | string;
```

##### context.team\_id?

```ts
optional team_id: string;
```

#### thread\_ts

```ts
thread_ts: string;
```

#### user\_id

```ts
user_id: string;
```

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/assistant.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/assistant.ts#L13)

***

### type

```ts
type: "assistant_thread_started";
```

Defined in: [events/assistant.ts:2](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/assistant.ts#L2)
