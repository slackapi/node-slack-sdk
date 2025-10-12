[@slack/types](../index.md) / MessageRepliedEvent

# Interface: MessageRepliedEvent

Defined in: [events/message.ts:255](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L255)

## Properties

### channel

```ts
channel: string;
```

Defined in: [events/message.ts:260](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L260)

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: [events/message.ts:261](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L261)

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/message.ts:258](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L258)

***

### hidden

```ts
hidden: true;
```

Defined in: [events/message.ts:259](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L259)

***

### message

```ts
message: AllMessageEvents & object;
```

Defined in: [events/message.ts:263](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L263)

#### Type Declaration

##### replies

```ts
replies: AllMessageEvents[];
```

##### reply\_count

```ts
reply_count: number;
```

##### thread\_ts

```ts
thread_ts: string;
```

***

### subtype

```ts
subtype: "message_replied";
```

Defined in: [events/message.ts:257](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L257)

***

### ts

```ts
ts: string;
```

Defined in: [events/message.ts:262](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L262)

***

### type

```ts
type: "message";
```

Defined in: [events/message.ts:256](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L256)
