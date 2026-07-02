[@slack/types](../index.md) / FileShareMessageEvent

# Interface: FileShareMessageEvent

Defined in: [events/message.ts:204](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L204)

## Properties

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: [events/message.ts:208](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L208)

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: [events/message.ts:209](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L209)

***

### channel

```ts
channel: string;
```

Defined in: [events/message.ts:218](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L218)

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: [events/message.ts:219](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L219)

***

### display\_as\_bot?

```ts
optional display_as_bot: boolean;
```

Defined in: [events/message.ts:212](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L212)

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/message.ts:220](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L220)

***

### files?

```ts
optional files: File[];
```

Defined in: [events/message.ts:210](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L210)

***

### parent\_user\_id?

```ts
optional parent_user_id: string;
```

Defined in: [events/message.ts:215](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L215)

***

### subtype

```ts
subtype: "file_share";
```

Defined in: [events/message.ts:206](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L206)

***

### text

```ts
text: string;
```

Defined in: [events/message.ts:207](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L207)

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: [events/message.ts:217](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L217)

***

### ts

```ts
ts: string;
```

Defined in: [events/message.ts:216](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L216)

***

### type

```ts
type: "message";
```

Defined in: [events/message.ts:205](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L205)

***

### upload?

```ts
optional upload: boolean;
```

Defined in: [events/message.ts:211](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L211)

***

### user

```ts
user: string;
```

Defined in: [events/message.ts:214](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L214)

***

### x\_files?

```ts
optional x_files: string[];
```

Defined in: [events/message.ts:213](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/message.ts#L213)
