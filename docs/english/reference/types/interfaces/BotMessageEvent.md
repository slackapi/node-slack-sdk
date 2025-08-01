[@slack/types](../index.md) / BotMessageEvent

# Interface: BotMessageEvent

Defined in: [events/message.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L65)

## Properties

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: [events/message.ts:82](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L82)

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: [events/message.ts:83](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L83)

***

### bot\_id

```ts
bot_id: string;
```

Defined in: [events/message.ts:73](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L73)

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

Defined in: [events/message.ts:84](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L84)

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

Defined in: [events/message.ts:75](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L75)

#### Index Signature

```ts
[size: string]: string
```

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

Defined in: [events/message.ts:72](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L72)

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: [events/message.ts:88](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L88)

***

### ts

```ts
ts: string;
```

Defined in: [events/message.ts:71](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L71)

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

Defined in: [events/message.ts:81](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L81)

***

### username?

```ts
optional username: string;
```

Defined in: [events/message.ts:74](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L74)
