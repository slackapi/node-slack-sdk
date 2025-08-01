[@slack/web-api](../index.md) / GenericMessageEvent

# Interface: GenericMessageEvent

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:7

## Properties

### assistant\_thread?

```ts
optional assistant_thread: Record<string, unknown>;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:36

***

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:20

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:21

***

### bot\_id?

```ts
optional bot_id: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:14

***

### bot\_profile?

```ts
optional bot_profile: BotProfile;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:15

***

### channel

```ts
channel: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:12

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:19

***

### client\_msg\_id?

```ts
optional client_msg_id: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:27

***

### edited?

```ts
optional edited: object;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:23

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

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:10

***

### files?

```ts
optional files: File[];
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:22

***

### is\_starred?

```ts
optional is_starred: boolean;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:29

***

### parent\_user\_id?

```ts
optional parent_user_id: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:28

***

### pinned\_to?

```ts
optional pinned_to: string[];
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:30

***

### reactions?

```ts
optional reactions: object[];
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:31

#### count

```ts
count: number;
```

#### name

```ts
name: string;
```

#### users

```ts
users: string[];
```

***

### subtype

```ts
subtype: undefined;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:9

***

### team?

```ts
optional team: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:11

***

### text?

```ts
optional text: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:16

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:18

***

### ts

```ts
ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:17

***

### type

```ts
type: "message";
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:8

***

### user

```ts
user: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:13
