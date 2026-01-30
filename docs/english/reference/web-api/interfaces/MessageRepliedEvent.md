[@slack/web-api](../index.md) / MessageRepliedEvent

# Interface: MessageRepliedEvent

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:211

## Properties

### channel

```ts
channel: string;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:216

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:217

***

### event\_ts

```ts
event_ts: string;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:214

***

### hidden

```ts
hidden: true;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:215

***

### message

```ts
message: AllMessageEvents & object;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:219

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

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:213

***

### ts

```ts
ts: string;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:218

***

### type

```ts
type: "message";
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:212
