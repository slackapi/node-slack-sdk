[@slack/web-api](../index.md) / BotMessageEvent

# Interface: BotMessageEvent

Defined in: packages/types/dist/events/message.d.ts:40

## Properties

### attachments?

```ts
attachments?: MessageAttachment[];
```

Defined in: packages/types/dist/events/message.d.ts:55

***

### blocks?

```ts
blocks?: (Block | KnownBlock)[];
```

Defined in: packages/types/dist/events/message.d.ts:56

***

### bot\_id

```ts
bot_id: string;
```

Defined in: packages/types/dist/events/message.d.ts:49

***

### channel

```ts
channel: string;
```

Defined in: packages/types/dist/events/message.d.ts:44

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: packages/types/dist/events/message.d.ts:45

***

### edited?

```ts
edited?: object;
```

Defined in: packages/types/dist/events/message.d.ts:57

#### ts

```ts
ts: string;
```

#### user

```ts
user: string;
```

***

### event\_ts

```ts
event_ts: string;
```

Defined in: packages/types/dist/events/message.d.ts:43

***

### icons?

```ts
icons?: object;
```

Defined in: packages/types/dist/events/message.d.ts:51

#### Index Signature

```ts
[size: string]: string
```

***

### streaming\_state?

```ts
streaming_state?: "in_progress" | "completed" | "errored";
```

Defined in: packages/types/dist/events/message.d.ts:46

***

### subtype

```ts
subtype: "bot_message";
```

Defined in: packages/types/dist/events/message.d.ts:42

***

### text

```ts
text: string;
```

Defined in: packages/types/dist/events/message.d.ts:48

***

### thread\_ts?

```ts
thread_ts?: string;
```

Defined in: packages/types/dist/events/message.d.ts:61

***

### ts

```ts
ts: string;
```

Defined in: packages/types/dist/events/message.d.ts:47

***

### type

```ts
type: "message";
```

Defined in: packages/types/dist/events/message.d.ts:41

***

### user?

```ts
user?: string;
```

Defined in: packages/types/dist/events/message.d.ts:54

***

### username?

```ts
username?: string;
```

Defined in: packages/types/dist/events/message.d.ts:50
