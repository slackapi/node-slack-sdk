[@slack/types](../index.md) / BotMessageEvent

# Interface: BotMessageEvent

Defined in: [events/message.ts:68](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L68)

## Properties

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: [events/message.ts:86](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L86)

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: [events/message.ts:87](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L87)

***

### bot\_id

```ts
bot_id: string;
```

Defined in: [events/message.ts:77](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L77)

***

### channel

```ts
channel: string;
```

Defined in: [events/message.ts:72](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L72)

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: [events/message.ts:73](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L73)

***

### edited?

```ts
optional edited: object;
```

Defined in: [events/message.ts:88](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L88)

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

Defined in: [events/message.ts:71](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L71)

***

### icons?

```ts
optional icons: object;
```

Defined in: [events/message.ts:79](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L79)

#### Index Signature

```ts
[size: string]: string
```

***

### streaming\_state?

```ts
optional streaming_state: "in_progress" | "completed" | "errored";
```

Defined in: [events/message.ts:74](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L74)

***

### subtype

```ts
subtype: "bot_message";
```

Defined in: [events/message.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L70)

***

### text

```ts
text: string;
```

Defined in: [events/message.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L76)

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: [events/message.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L92)

***

### ts

```ts
ts: string;
```

Defined in: [events/message.ts:75](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L75)

***

### type

```ts
type: "message";
```

Defined in: [events/message.ts:69](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L69)

***

### user?

```ts
optional user: string;
```

Defined in: [events/message.ts:85](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L85)

***

### username?

```ts
optional username: string;
```

Defined in: [events/message.ts:78](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L78)
