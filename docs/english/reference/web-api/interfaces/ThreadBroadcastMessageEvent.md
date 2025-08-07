[@slack/web-api](../index.md) / ThreadBroadcastMessageEvent

# Interface: ThreadBroadcastMessageEvent

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:224

## Properties

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:229

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:230

***

### channel

```ts
channel: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:242

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:243

***

### client\_msg\_id

```ts
client_msg_id: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:241

***

### event\_ts

```ts
event_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:227

***

### root

```ts
root: 
  | GenericMessageEvent
  | BotMessageEvent & object;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:234

#### Type declaration

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

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:226

***

### text

```ts
text: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:228

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:233

***

### ts

```ts
ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:232

***

### type

```ts
type: "message";
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:225

***

### user

```ts
user: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:231
