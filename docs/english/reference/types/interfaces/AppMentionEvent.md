[@slack/types](../index.md) / AppMentionEvent

# Interface: AppMentionEvent

Defined in: [events/app.ts:110](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L110)

## Properties

### attachments?

```ts
optional attachments: MessageAttachment[];
```

Defined in: [events/app.ts:134](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L134)

***

### blocks?

```ts
optional blocks: (Block | KnownBlock)[];
```

Defined in: [events/app.ts:135](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L135)

***

### bot\_id?

```ts
optional bot_id: string;
```

Defined in: [events/app.ts:113](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L113)

***

### bot\_profile?

```ts
optional bot_profile: BotProfile;
```

Defined in: [events/app.ts:114](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L114)

***

### channel

```ts
channel: string;
```

Defined in: [events/app.ts:145](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L145)

***

### client\_msg\_id?

```ts
optional client_msg_id: string;
```

Defined in: [events/app.ts:148](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L148)

***

### display\_as\_bot?

```ts
optional display_as_bot: boolean;
```

Defined in: [events/app.ts:139](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L139)

***

### edited?

```ts
optional edited: object;
```

Defined in: [events/app.ts:140](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L140)

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

Defined in: [events/app.ts:146](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L146)

***

### files?

```ts
optional files: object[];
```

Defined in: [events/app.ts:137](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L137)

#### id

```ts
id: string;
```

***

### source\_team?

```ts
optional source_team: string;
```

Defined in: [events/app.ts:120](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L120)

***

### subtype?

```ts
optional subtype: string;
```

Defined in: [events/app.ts:112](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L112)

***

### team?

```ts
optional team: string;
```

Defined in: [events/app.ts:116](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L116)

***

### text

```ts
text: string;
```

Defined in: [events/app.ts:133](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L133)

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: [events/app.ts:147](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L147)

***

### ts

```ts
ts: string;
```

Defined in: [events/app.ts:144](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L144)

***

### type

```ts
type: "app_mention";
```

Defined in: [events/app.ts:111](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L111)

***

### upload?

```ts
optional upload: boolean;
```

Defined in: [events/app.ts:138](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L138)

***

### user?

```ts
optional user: string;
```

Defined in: [events/app.ts:132](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L132)

***

### user\_profile?

```ts
optional user_profile: object;
```

Defined in: [events/app.ts:121](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L121)

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

Defined in: [events/app.ts:119](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L119)

***

### username?

```ts
optional username: string;
```

Defined in: [events/app.ts:115](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L115)
