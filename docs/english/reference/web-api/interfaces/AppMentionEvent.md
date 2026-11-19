[@slack/web-api](../index.md) / AppMentionEvent

# Interface: AppMentionEvent

Defined in: packages/types/dist/events/app.d.ts:103

## Properties

### attachments?

```ts
attachments?: MessageAttachment[];
```

Defined in: packages/types/dist/events/app.d.ts:125

***

### blocks?

```ts
blocks?: (Block | KnownBlock)[];
```

Defined in: packages/types/dist/events/app.d.ts:126

***

### bot\_id?

```ts
bot_id?: string;
```

Defined in: packages/types/dist/events/app.d.ts:106

***

### bot\_profile?

```ts
bot_profile?: BotProfile;
```

Defined in: packages/types/dist/events/app.d.ts:107

***

### channel

```ts
channel: string;
```

Defined in: packages/types/dist/events/app.d.ts:190

***

### client\_msg\_id?

```ts
client_msg_id?: string;
```

Defined in: packages/types/dist/events/app.d.ts:193

***

### display\_as\_bot?

```ts
display_as_bot?: boolean;
```

Defined in: packages/types/dist/events/app.d.ts:184

***

### edited?

```ts
edited?: object;
```

Defined in: packages/types/dist/events/app.d.ts:185

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

Defined in: packages/types/dist/events/app.d.ts:191

***

### files?

```ts
files?: object[];
```

Defined in: packages/types/dist/events/app.d.ts:127

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
original_h?: number;
```

#### original\_w?

```ts
original_w?: number;
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
thumb_1024?: string;
```

#### thumb\_1024\_h?

```ts
thumb_1024_h?: number;
```

#### thumb\_1024\_w?

```ts
thumb_1024_w?: number;
```

#### thumb\_160?

```ts
thumb_160?: string;
```

#### thumb\_360?

```ts
thumb_360?: string;
```

#### thumb\_360\_h?

```ts
thumb_360_h?: number;
```

#### thumb\_360\_w?

```ts
thumb_360_w?: number;
```

#### thumb\_480?

```ts
thumb_480?: string;
```

#### thumb\_480\_h?

```ts
thumb_480_h?: number;
```

#### thumb\_480\_w?

```ts
thumb_480_w?: number;
```

#### thumb\_64?

```ts
thumb_64?: string;
```

#### thumb\_720?

```ts
thumb_720?: string;
```

#### thumb\_720\_h?

```ts
thumb_720_h?: number;
```

#### thumb\_720\_w?

```ts
thumb_720_w?: number;
```

#### thumb\_80?

```ts
thumb_80?: string;
```

#### thumb\_800?

```ts
thumb_800?: string;
```

#### thumb\_800\_h?

```ts
thumb_800_h?: number;
```

#### thumb\_800\_w?

```ts
thumb_800_w?: number;
```

#### thumb\_960?

```ts
thumb_960?: string;
```

#### thumb\_960\_h?

```ts
thumb_960_h?: number;
```

#### thumb\_960\_w?

```ts
thumb_960_w?: number;
```

#### thumb\_pdf?

```ts
thumb_pdf?: string;
```

#### thumb\_pdf\_h?

```ts
thumb_pdf_h?: number;
```

#### thumb\_pdf\_w?

```ts
thumb_pdf_w?: number;
```

#### thumb\_tiny?

```ts
thumb_tiny?: string;
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
source_team?: string;
```

Defined in: packages/types/dist/events/app.d.ts:111

***

### subtype?

```ts
subtype?: string;
```

Defined in: packages/types/dist/events/app.d.ts:105

***

### team?

```ts
team?: string;
```

Defined in: packages/types/dist/events/app.d.ts:109

***

### text

```ts
text: string;
```

Defined in: packages/types/dist/events/app.d.ts:124

***

### thread\_ts?

```ts
thread_ts?: string;
```

Defined in: packages/types/dist/events/app.d.ts:192

***

### ts

```ts
ts: string;
```

Defined in: packages/types/dist/events/app.d.ts:189

***

### type

```ts
type: "app_mention";
```

Defined in: packages/types/dist/events/app.d.ts:104

***

### upload?

```ts
upload?: boolean;
```

Defined in: packages/types/dist/events/app.d.ts:183

***

### user?

```ts
user?: string;
```

Defined in: packages/types/dist/events/app.d.ts:123

***

### user\_profile?

```ts
user_profile?: object;
```

Defined in: packages/types/dist/events/app.d.ts:112

#### avatar\_hash?

```ts
avatar_hash?: string;
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
image_72?: string;
```

#### is\_restricted?

```ts
is_restricted?: boolean;
```

#### is\_ultra\_restricted?

```ts
is_ultra_restricted?: boolean;
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
user_team?: string;
```

Defined in: packages/types/dist/events/app.d.ts:110

***

### username?

```ts
username?: string;
```

Defined in: packages/types/dist/events/app.d.ts:108
