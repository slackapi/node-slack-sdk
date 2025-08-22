[@slack/types](../index.md) / GenericMessageEvent

# Interface: GenericMessageEvent

Defined in: [events/message.ts:29](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L29)

## Properties

### assistant\_thread?

```ts
optional assistant_thread: Record<string, unknown>;
```

Defined in: [events/message.ts:62](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L62)

***

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: [events/message.ts:42](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L42)

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: [events/message.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L43)

***

### bot\_id?

```ts
optional bot_id: string;
```

Defined in: [events/message.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L36)

***

### bot\_profile?

```ts
optional bot_profile: BotProfile;
```

Defined in: [events/message.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L37)

***

### channel

```ts
channel: string;
```

Defined in: [events/message.ts:34](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L34)

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: [events/message.ts:41](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L41)

***

### client\_msg\_id?

```ts
optional client_msg_id: string;
```

Defined in: [events/message.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L49)

***

### edited?

```ts
optional edited: object;
```

Defined in: [events/message.ts:45](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L45)

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

Defined in: [events/message.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L32)

***

### files?

```ts
optional files: File[];
```

Defined in: [events/message.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L44)

***

### is\_starred?

```ts
optional is_starred: boolean;
```

Defined in: [events/message.ts:53](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L53)

***

### parent\_user\_id?

```ts
optional parent_user_id: string;
```

Defined in: [events/message.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L50)

***

### pinned\_to?

```ts
optional pinned_to: string[];
```

Defined in: [events/message.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L54)

***

### reactions?

```ts
optional reactions: object[];
```

Defined in: [events/message.ts:55](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L55)

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

Defined in: [events/message.ts:31](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L31)

***

### team?

```ts
optional team: string;
```

Defined in: [events/message.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L33)

***

### text?

```ts
optional text: string;
```

Defined in: [events/message.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L38)

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: [events/message.ts:40](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L40)

***

### ts

```ts
ts: string;
```

Defined in: [events/message.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L39)

***

### type

```ts
type: "message";
```

Defined in: [events/message.ts:30](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L30)

***

### user

```ts
user: string;
```

Defined in: [events/message.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L35)
