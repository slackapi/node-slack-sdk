[@slack/types](../index.md) / ThreadBroadcastMessageEvent

# Interface: ThreadBroadcastMessageEvent

Defined in: [events/message.ts:272](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L272)

## Properties

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: [events/message.ts:277](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L277)

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: [events/message.ts:278](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L278)

***

### channel

```ts
channel: string;
```

Defined in: [events/message.ts:290](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L290)

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: [events/message.ts:291](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L291)

***

### client\_msg\_id

```ts
client_msg_id: string;
```

Defined in: [events/message.ts:289](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L289)

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/message.ts:275](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L275)

***

### root

```ts
root: 
  | GenericMessageEvent
  | BotMessageEvent & object;
```

Defined in: [events/message.ts:282](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L282)

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

Defined in: [events/message.ts:274](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L274)

***

### text

```ts
text: string;
```

Defined in: [events/message.ts:276](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L276)

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: [events/message.ts:281](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L281)

***

### ts

```ts
ts: string;
```

Defined in: [events/message.ts:280](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L280)

***

### type

```ts
type: "message";
```

Defined in: [events/message.ts:273](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L273)

***

### user

```ts
user: string;
```

Defined in: [events/message.ts:279](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L279)
