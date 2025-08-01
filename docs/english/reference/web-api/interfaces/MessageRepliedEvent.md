[@slack/web-api](../index.md) / MessageRepliedEvent

# Interface: MessageRepliedEvent

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:210

## Properties

### channel

```ts
channel: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:215

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:216

***

### event\_ts

```ts
event_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:213

***

### hidden

```ts
hidden: true;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:214

***

### message

```ts
message: AllMessageEvents & object;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:218

#### Type declaration

##### replies

```ts
replies: AllMessageEvents[];
```

##### reply\_count

```ts
reply_count: number;
```

##### thread\_ts

```ts
thread_ts: string;
```

***

### subtype

```ts
subtype: "message_replied";
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:212

***

### ts

```ts
ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:217

***

### type

```ts
type: "message";
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:211
