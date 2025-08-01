[@slack/web-api](../index.md) / BotMessageEvent

# Interface: BotMessageEvent

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:38

## Properties

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:52

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:53

***

### bot\_id

```ts
bot_id: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:46

***

### channel

```ts
channel: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:42

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:43

***

### edited?

```ts
optional edited: object;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:54

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

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:41

***

### icons?

```ts
optional icons: object;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:48

#### Index Signature

```ts
[size: string]: string
```

***

### subtype

```ts
subtype: "bot_message";
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:40

***

### text

```ts
text: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:45

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:58

***

### ts

```ts
ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:44

***

### type

```ts
type: "message";
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:39

***

### user?

```ts
optional user: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:51

***

### username?

```ts
optional username: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:47
