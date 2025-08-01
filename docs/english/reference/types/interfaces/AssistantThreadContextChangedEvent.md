[@slack/types](../index.md) / AssistantThreadContextChangedEvent

# Interface: AssistantThreadContextChangedEvent

Defined in: [events/assistant.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/assistant.ts#L16)

## Properties

### assistant\_thread

```ts
assistant_thread: object;
```

Defined in: [events/assistant.ts:18](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/assistant.ts#L18)

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

Defined in: [events/assistant.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/assistant.ts#L28)

***

### type

```ts
type: "assistant_thread_context_changed";
```

Defined in: [events/assistant.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/assistant.ts#L17)
