[@slack/types](../index.md) / BotMessageEvent

# Interface: BotMessageEvent

Defined in: [events/message.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L65)

## Properties

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: [events/message.ts:83](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L83)

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: [events/message.ts:84](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L84)

***

### bot\_id

```ts
bot_id: string;
```

Defined in: [events/message.ts:74](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L74)

***

### channel

```ts
channel: string;
```

Defined in: [events/message.ts:69](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L69)

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: [events/message.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L70)

***

### edited?

```ts
optional edited: object;
```

Defined in: [events/message.ts:85](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L85)

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

Defined in: [events/message.ts:68](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L68)

***

### icons?

```ts
optional icons: object;
```

Defined in: [events/message.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L76)

#### Index Signature

```ts
[size: string]: string
```

***

### streaming\_state?

```ts
optional streaming_state: "in_progress" | "completed" | "errored";
```

Defined in: [events/message.ts:71](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L71)

***

### subtype

```ts
subtype: "bot_message";
```

Defined in: [events/message.ts:67](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L67)

***

### text

```ts
text: string;
```

Defined in: [events/message.ts:73](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L73)

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: [events/message.ts:89](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L89)

***

### ts

```ts
ts: string;
```

Defined in: [events/message.ts:72](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L72)

***

### type

```ts
type: "message";
```

Defined in: [events/message.ts:66](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L66)

***

### user?

```ts
optional user: string;
```

Defined in: [events/message.ts:82](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L82)

***

### username?

```ts
optional username: string;
```

Defined in: [events/message.ts:75](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L75)
