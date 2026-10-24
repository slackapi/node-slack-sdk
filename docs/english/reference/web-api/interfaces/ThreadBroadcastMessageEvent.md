[@slack/web-api](../index.md) / ThreadBroadcastMessageEvent

# Interface: ThreadBroadcastMessageEvent

Defined in: packages/types/dist/events/message.d.ts:227

## Properties

### attachments?

```ts
optional attachments?: MessageAttachment[];
```

Defined in: packages/types/dist/events/message.d.ts:232

***

### blocks?

```ts
optional blocks?: (Block | KnownBlock)[];
```

Defined in: packages/types/dist/events/message.d.ts:233

***

### channel

```ts
channel: string;
```

Defined in: packages/types/dist/events/message.d.ts:249

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: packages/types/dist/events/message.d.ts:250

***

### client\_msg\_id

```ts
client_msg_id: string;
```

Defined in: packages/types/dist/events/message.d.ts:248

***

### display\_as\_bot?

```ts
optional display_as_bot?: boolean;
```

Defined in: packages/types/dist/events/message.d.ts:236

***

### event\_ts

```ts
event_ts: string;
```

Defined in: packages/types/dist/events/message.d.ts:230

***

### files?

```ts
optional files?: File[];
```

Defined in: packages/types/dist/events/message.d.ts:234

***

### parent\_user\_id?

```ts
optional parent_user_id?: string;
```

Defined in: packages/types/dist/events/message.d.ts:238

***

### root

```ts
root: 
  | GenericMessageEvent
  | BotMessageEvent & object;
```

Defined in: packages/types/dist/events/message.d.ts:241

#### Type Declaration

##### latest\_reply

```ts
latest_reply: string;
```

##### reply\_count

```ts
reply_count: number;
```

##### reply\_users

```ts
reply_users: string[];
```

##### reply\_users\_count

```ts
reply_users_count: number;
```

##### thread\_ts

```ts
thread_ts: string;
```

***

### subtype

```ts
subtype: "thread_broadcast";
```

Defined in: packages/types/dist/events/message.d.ts:229

***

### text

```ts
text: string;
```

Defined in: packages/types/dist/events/message.d.ts:231

***

### thread\_ts?

```ts
optional thread_ts?: string;
```

Defined in: packages/types/dist/events/message.d.ts:240

***

### ts

```ts
ts: string;
```

Defined in: packages/types/dist/events/message.d.ts:239

***

### type

```ts
type: "message";
```

Defined in: packages/types/dist/events/message.d.ts:228

***

### upload?

```ts
optional upload?: boolean;
```

Defined in: packages/types/dist/events/message.d.ts:235

***

### user

```ts
user: string;
```

Defined in: packages/types/dist/events/message.d.ts:237
