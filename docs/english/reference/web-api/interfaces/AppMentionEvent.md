[@slack/web-api](../index.md) / AppMentionEvent

# Interface: AppMentionEvent

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:102

## Properties

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:124

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:125

***

### bot\_id?

```ts
optional bot_id: string;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:105

***

### bot\_profile?

```ts
optional bot_profile: BotProfile;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:106

***

### channel

```ts
channel: string;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:136

***

### client\_msg\_id?

```ts
optional client_msg_id: string;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:139

***

### display\_as\_bot?

```ts
optional display_as_bot: boolean;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:130

***

### edited?

```ts
optional edited: object;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:131

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

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:137

***

### files?

```ts
optional files: object[];
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:126

#### id

```ts
id: string;
```

***

### source\_team?

```ts
optional source_team: string;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:110

***

### subtype?

```ts
optional subtype: string;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:104

***

### team?

```ts
optional team: string;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:108

***

### text

```ts
text: string;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:123

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:138

***

### ts

```ts
ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:135

***

### type

```ts
type: "app_mention";
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:103

***

### upload?

```ts
optional upload: boolean;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:129

***

### user?

```ts
optional user: string;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:122

***

### user\_profile?

```ts
optional user_profile: object;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:111

#### avatar\_hash?

```ts
optional avatar_hash: string;
```

#### display\_name

```ts
display_name: string;
```

#### first\_name

```ts
first_name: string;
```

#### image\_72?

```ts
optional image_72: string;
```

#### is\_restricted?

```ts
optional is_restricted: boolean;
```

#### is\_ultra\_restricted?

```ts
optional is_ultra_restricted: boolean;
```

#### name

```ts
name: string;
```

#### real\_name

```ts
real_name: string;
```

#### team

```ts
team: string;
```

***

### user\_team?

```ts
optional user_team: string;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:109

***

### username?

```ts
optional username: string;
```

Defined in: node\_modules/@slack/types/dist/events/app.d.ts:107
