[@slack/types](../index.md) / MessageRepliedEvent

# Interface: MessageRepliedEvent

Defined in: [events/message.ts:258](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L258)

## Properties

### channel

```ts
channel: string;
```

Defined in: [events/message.ts:263](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L263)

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: [events/message.ts:264](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L264)

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/message.ts:261](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L261)

***

### hidden

```ts
hidden: true;
```

Defined in: [events/message.ts:262](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L262)

***

### message

```ts
message: AllMessageEvents & object;
```

Defined in: [events/message.ts:266](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L266)

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

Defined in: [events/message.ts:260](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L260)

***

### ts

```ts
ts: string;
```

Defined in: [events/message.ts:265](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L265)

***

### type

```ts
type: "message";
```

Defined in: [events/message.ts:259](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L259)
