[@slack/types](../index.md) / ThreadBroadcastMessageEvent

# Interface: ThreadBroadcastMessageEvent

Defined in: [events/message.ts:276](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L276)

## Properties

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: [events/message.ts:281](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L281)

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: [events/message.ts:282](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L282)

***

### channel

```ts
channel: string;
```

Defined in: [events/message.ts:294](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L294)

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: [events/message.ts:295](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L295)

***

### client\_msg\_id

```ts
client_msg_id: string;
```

Defined in: [events/message.ts:293](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L293)

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/message.ts:279](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L279)

***

### root

```ts
root: 
  | GenericMessageEvent
  | BotMessageEvent & object;
```

Defined in: [events/message.ts:286](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L286)

#### Type Declaration

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

Defined in: [events/message.ts:278](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L278)

***

### text

```ts
text: string;
```

Defined in: [events/message.ts:280](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L280)

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: [events/message.ts:285](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L285)

***

### ts

```ts
ts: string;
```

Defined in: [events/message.ts:284](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L284)

***

### type

```ts
type: "message";
```

Defined in: [events/message.ts:277](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L277)

***

### user

```ts
user: string;
```

Defined in: [events/message.ts:283](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L283)
