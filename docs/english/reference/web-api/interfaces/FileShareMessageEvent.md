[@slack/web-api](../index.md) / FileShareMessageEvent

# Interface: FileShareMessageEvent

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:161

## Properties

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:165

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:166

***

### channel

```ts
channel: string;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:175

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:176

***

### display\_as\_bot?

```ts
optional display_as_bot: boolean;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:169

***

### event\_ts

```ts
event_ts: string;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:177

***

### files?

```ts
optional files: File[];
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:167

***

### parent\_user\_id?

```ts
optional parent_user_id: string;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:172

***

### subtype

```ts
subtype: "file_share";
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:163

***

### text

```ts
text: string;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:164

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:174

***

### ts

```ts
ts: string;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:173

***

### type

```ts
type: "message";
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:162

***

### upload?

```ts
optional upload: boolean;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:168

***

### user

```ts
user: string;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:171

***

### x\_files?

```ts
optional x_files: string[];
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/events/message.d.ts:170
