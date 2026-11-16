[@slack/web-api](../index.md) / FileShareMessageEvent

# Interface: FileShareMessageEvent

Defined in: packages/types/dist/events/message.d.ts:163

## Properties

### attachments?

```ts
attachments?: MessageAttachment[];
```

Defined in: packages/types/dist/events/message.d.ts:167

***

### blocks?

```ts
blocks?: (Block | KnownBlock)[];
```

Defined in: packages/types/dist/events/message.d.ts:168

***

### channel

```ts
channel: string;
```

Defined in: packages/types/dist/events/message.d.ts:177

***

### channel\_type

```ts
channel_type: ChannelTypes;
```

Defined in: packages/types/dist/events/message.d.ts:178

***

### display\_as\_bot?

```ts
display_as_bot?: boolean;
```

Defined in: packages/types/dist/events/message.d.ts:171

***

### event\_ts

```ts
event_ts: string;
```

Defined in: packages/types/dist/events/message.d.ts:179

***

### files?

```ts
files?: File[];
```

Defined in: packages/types/dist/events/message.d.ts:169

***

### parent\_user\_id?

```ts
parent_user_id?: string;
```

Defined in: packages/types/dist/events/message.d.ts:174

***

### subtype

```ts
subtype: "file_share";
```

Defined in: packages/types/dist/events/message.d.ts:165

***

### text

```ts
text: string;
```

Defined in: packages/types/dist/events/message.d.ts:166

***

### thread\_ts?

```ts
thread_ts?: string;
```

Defined in: packages/types/dist/events/message.d.ts:176

***

### ts

```ts
ts: string;
```

Defined in: packages/types/dist/events/message.d.ts:175

***

### type

```ts
type: "message";
```

Defined in: packages/types/dist/events/message.d.ts:164

***

### upload?

```ts
upload?: boolean;
```

Defined in: packages/types/dist/events/message.d.ts:170

***

### user

```ts
user: string;
```

Defined in: packages/types/dist/events/message.d.ts:173

***

### x\_files?

```ts
x_files?: string[];
```

Defined in: packages/types/dist/events/message.d.ts:172
