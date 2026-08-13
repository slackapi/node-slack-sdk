[@slack/web-api](../index.md) / GenericMessageEvent

# Interface: GenericMessageEvent

Defined in: packages/types/dist/events/message.d.ts:8

## Properties

### app\_context?

```ts
optional app_context: object;
```

Defined in: packages/types/dist/events/message.d.ts:38

#### entities?

```ts
optional entities: 
  | {
  type: "slack#/types/channel_id";
  value: string;
}
  | {
  type: "slack#/types/canvas_id";
  value: string;
}
  | {
  type: "slack#/types/list_id";
  value: string;
}
  | {
  type: "slack#/types/message_context";
  value: {
     channel_id: string;
     message_ts: string;
  };
} & object[];
```

***

### assistant\_thread?

```ts
optional assistant_thread: Record<string, unknown>;
```

Defined in: packages/types/dist/events/message.d.ts:37

***

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: packages/types/dist/events/message.d.ts:21

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: packages/types/dist/events/message.d.ts:22

***

### bot\_id?

```ts
optional bot_id: string;
```

Defined in: packages/types/dist/events/message.d.ts:15

***

### bot\_profile?

```ts
optional bot_profile: BotProfile;
```

Defined in: packages/types/dist/events/message.d.ts:16

***

### channel

```ts
channel: string;
```

Defined in: packages/types/dist/events/message.d.ts:13

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: packages/types/dist/events/message.d.ts:20

***

### client\_msg\_id?

```ts
optional client_msg_id: string;
```

Defined in: packages/types/dist/events/message.d.ts:28

***

### edited?

```ts
optional edited: object;
```

Defined in: packages/types/dist/events/message.d.ts:24

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

Defined in: packages/types/dist/events/message.d.ts:11

***

### files?

```ts
optional files: File[];
```

Defined in: packages/types/dist/events/message.d.ts:23

***

### is\_starred?

```ts
optional is_starred: boolean;
```

Defined in: packages/types/dist/events/message.d.ts:30

***

### parent\_user\_id?

```ts
optional parent_user_id: string;
```

Defined in: packages/types/dist/events/message.d.ts:29

***

### pinned\_to?

```ts
optional pinned_to: string[];
```

Defined in: packages/types/dist/events/message.d.ts:31

***

### reactions?

```ts
optional reactions: object[];
```

Defined in: packages/types/dist/events/message.d.ts:32

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

Defined in: packages/types/dist/events/message.d.ts:10

***

### team?

```ts
optional team: string;
```

Defined in: packages/types/dist/events/message.d.ts:12

***

### text?

```ts
optional text: string;
```

Defined in: packages/types/dist/events/message.d.ts:17

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: packages/types/dist/events/message.d.ts:19

***

### ts

```ts
ts: string;
```

Defined in: packages/types/dist/events/message.d.ts:18

***

### type

```ts
type: "message";
```

Defined in: packages/types/dist/events/message.d.ts:9

***

### user

```ts
user: string;
```

Defined in: packages/types/dist/events/message.d.ts:14
