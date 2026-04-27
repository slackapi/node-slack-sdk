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

Defined in: [events/app.ts:200](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L200)

***

### client\_msg\_id?

```ts
optional client_msg_id: string;
```

Defined in: [events/app.ts:203](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L203)

***

### display\_as\_bot?

```ts
optional display_as_bot: boolean;
```

Defined in: [events/app.ts:194](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L194)

***

### edited?

```ts
optional edited: object;
```

Defined in: [events/app.ts:195](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L195)

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

Defined in: [events/app.ts:201](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L201)

***

### files?

```ts
optional files: object[];
```

Defined in: [events/app.ts:137](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L137)

#### created

```ts
created: number;
```

#### display\_as\_bot

```ts
display_as_bot: boolean;
```

#### editable

```ts
editable: boolean;
```

#### external\_type

```ts
external_type: string;
```

#### file\_access

```ts
file_access: string;
```

#### filetype

```ts
filetype: string;
```

#### has\_rich\_preview

```ts
has_rich_preview: boolean;
```

#### id

```ts
id: string;
```

#### is\_external

```ts
is_external: boolean;
```

#### is\_public

```ts
is_public: boolean;
```

#### is\_starred

```ts
is_starred: boolean;
```

#### media\_display\_type

```ts
media_display_type: string;
```

#### mimetype

```ts
mimetype: string;
```

#### mode

```ts
mode: string;
```

#### name

```ts
name: string;
```

#### original\_h?

```ts
optional original_h: number;
```

#### original\_w?

```ts
optional original_w: number;
```

#### permalink

```ts
permalink: string;
```

#### permalink\_public

```ts
permalink_public: string;
```

#### pretty\_type

```ts
pretty_type: string;
```

#### public\_url\_shared

```ts
public_url_shared: boolean;
```

#### size

```ts
size: number;
```

#### thumb\_1024?

```ts
optional thumb_1024: string;
```

#### thumb\_1024\_h?

```ts
optional thumb_1024_h: number;
```

#### thumb\_1024\_w?

```ts
optional thumb_1024_w: number;
```

#### thumb\_160?

```ts
optional thumb_160: string;
```

#### thumb\_360?

```ts
optional thumb_360: string;
```

#### thumb\_360\_h?

```ts
optional thumb_360_h: number;
```

#### thumb\_360\_w?

```ts
optional thumb_360_w: number;
```

#### thumb\_480?

```ts
optional thumb_480: string;
```

#### thumb\_480\_h?

```ts
optional thumb_480_h: number;
```

#### thumb\_480\_w?

```ts
optional thumb_480_w: number;
```

#### thumb\_64?

```ts
optional thumb_64: string;
```

#### thumb\_720?

```ts
optional thumb_720: string;
```

#### thumb\_720\_h?

```ts
optional thumb_720_h: number;
```

#### thumb\_720\_w?

```ts
optional thumb_720_w: number;
```

#### thumb\_80?

```ts
optional thumb_80: string;
```

#### thumb\_800?

```ts
optional thumb_800: string;
```

#### thumb\_800\_h?

```ts
optional thumb_800_h: number;
```

#### thumb\_800\_w?

```ts
optional thumb_800_w: number;
```

#### thumb\_960?

```ts
optional thumb_960: string;
```

#### thumb\_960\_h?

```ts
optional thumb_960_h: number;
```

#### thumb\_960\_w?

```ts
optional thumb_960_w: number;
```

#### thumb\_pdf?

```ts
optional thumb_pdf: string;
```

#### thumb\_pdf\_h?

```ts
optional thumb_pdf_h: number;
```

#### thumb\_pdf\_w?

```ts
optional thumb_pdf_w: number;
```

#### thumb\_tiny?

```ts
optional thumb_tiny: string;
```

#### timestamp

```ts
timestamp: number;
```

#### title

```ts
title: string;
```

#### url\_private

```ts
url_private: string;
```

#### url\_private\_download

```ts
url_private_download: string;
```

#### user

```ts
user: string;
```

#### user\_team

```ts
user_team: string;
```

#### username

```ts
username: string;
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

Defined in: [events/app.ts:202](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L202)

***

### ts

```ts
ts: string;
```

Defined in: [events/app.ts:199](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L199)

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

Defined in: [events/app.ts:193](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L193)

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
