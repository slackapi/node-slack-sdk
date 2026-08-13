[@slack/types](../index.md) / GenericMessageEvent

# Interface: GenericMessageEvent

Defined in: [events/message.ts:30](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L30)

## Properties

### app\_context?

```ts
optional app_context: object;
```

Defined in: [events/message.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L65)

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

Defined in: [events/message.ts:63](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L63)

***

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: [events/message.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L43)

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: [events/message.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L44)

***

### bot\_id?

```ts
optional bot_id: string;
```

Defined in: [events/message.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L37)

***

### bot\_profile?

```ts
optional bot_profile: BotProfile;
```

Defined in: [events/message.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L38)

***

### channel

```ts
channel: string;
```

Defined in: [events/message.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L35)

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: [events/message.ts:42](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L42)

***

### client\_msg\_id?

```ts
optional client_msg_id: string;
```

Defined in: [events/message.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L50)

***

### edited?

```ts
optional edited: object;
```

Defined in: [events/message.ts:46](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L46)

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

Defined in: [events/message.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L33)

***

### files?

```ts
optional files: File[];
```

Defined in: [events/message.ts:45](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L45)

***

### is\_starred?

```ts
optional is_starred: boolean;
```

Defined in: [events/message.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L54)

***

### parent\_user\_id?

```ts
optional parent_user_id: string;
```

Defined in: [events/message.ts:51](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L51)

***

### pinned\_to?

```ts
optional pinned_to: string[];
```

Defined in: [events/message.ts:55](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L55)

***

### reactions?

```ts
optional reactions: object[];
```

Defined in: [events/message.ts:56](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L56)

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

Defined in: [events/message.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L32)

***

### team?

```ts
optional team: string;
```

Defined in: [events/message.ts:34](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L34)

***

### text?

```ts
optional text: string;
```

Defined in: [events/message.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L39)

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: [events/message.ts:41](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L41)

***

### ts

```ts
ts: string;
```

Defined in: [events/message.ts:40](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L40)

***

### type

```ts
type: "message";
```

Defined in: [events/message.ts:31](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L31)

***

### user

```ts
user: string;
```

Defined in: [events/message.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L36)
