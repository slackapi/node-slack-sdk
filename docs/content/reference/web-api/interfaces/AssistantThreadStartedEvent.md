[@slack/web-api](../index.md) / AssistantThreadStartedEvent

# Interface: AssistantThreadStartedEvent

Defined in: node\_modules/@slack/types/dist/events/assistant.d.ts:1

## Properties

### assistant\_thread

```ts
assistant_thread: object;
```

Defined in: node\_modules/@slack/types/dist/events/assistant.d.ts:3

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

Defined in: node\_modules/@slack/types/dist/events/assistant.d.ts:13

***

### type

```ts
type: "assistant_thread_started";
```

Defined in: node\_modules/@slack/types/dist/events/assistant.d.ts:2
