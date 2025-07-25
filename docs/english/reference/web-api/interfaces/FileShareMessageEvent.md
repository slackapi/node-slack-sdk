[@slack/web-api](../index.md) / FileShareMessageEvent

# Interface: FileShareMessageEvent

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:160

## Properties

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:164

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:165

***

### channel

```ts
channel: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:174

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:175

***

### display\_as\_bot?

```ts
optional display_as_bot: boolean;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:168

***

### event\_ts

```ts
event_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:176

***

### files?

```ts
optional files: File[];
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:166

***

### parent\_user\_id?

```ts
optional parent_user_id: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:171

***

### subtype

```ts
subtype: "file_share";
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:162

***

### text

```ts
text: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:163

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:173

***

### ts

```ts
ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:172

***

### type

```ts
type: "message";
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:161

***

### upload?

```ts
optional upload: boolean;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:167

***

### user

```ts
user: string;
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:170

***

### x\_files?

```ts
optional x_files: string[];
```

Defined in: node\_modules/@slack/types/dist/events/message.d.ts:169
