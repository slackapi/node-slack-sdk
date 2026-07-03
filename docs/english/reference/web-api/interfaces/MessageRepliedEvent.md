[@slack/web-api](../index.md) / MessageRepliedEvent

# Interface: MessageRepliedEvent

Defined in: packages/types/dist/events/message.d.ts:213

## Properties

### channel

```ts
channel: string;
```

Defined in: packages/types/dist/events/message.d.ts:218

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: packages/types/dist/events/message.d.ts:219

***

### event\_ts

```ts
event_ts: string;
```

Defined in: packages/types/dist/events/message.d.ts:216

***

### hidden

```ts
hidden: true;
```

Defined in: packages/types/dist/events/message.d.ts:217

***

### message

```ts
message: AllMessageEvents & object;
```

Defined in: packages/types/dist/events/message.d.ts:221

#### Type Declaration

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

Defined in: packages/types/dist/events/message.d.ts:215

***

### ts

```ts
ts: string;
```

Defined in: packages/types/dist/events/message.d.ts:220

***

### type

```ts
type: "message";
```

Defined in: packages/types/dist/events/message.d.ts:214
