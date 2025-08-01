[@slack/web-api](../index.md) / UserHuddleChangedEvent

# Interface: UserHuddleChangedEvent

Defined in: node\_modules/@slack/types/dist/events/user.d.ts:80

## Properties

### cache\_ts

```ts
cache_ts: number;
```

Defined in: node\_modules/@slack/types/dist/events/user.d.ts:155

***

### event\_ts

```ts
event_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/user.d.ts:156

***

### type

```ts
type: "user_huddle_changed";
```

Defined in: node\_modules/@slack/types/dist/events/user.d.ts:81

***

### user

```ts
user: object;
```

Defined in: node\_modules/@slack/types/dist/events/user.d.ts:82

#### color

```ts
color: string;
```

#### deleted

```ts
deleted: boolean;
```

#### enterprise\_user?

```ts
optional enterprise_user: object;
```

##### enterprise\_user.enterprise\_id

```ts
enterprise_id: string;
```

##### enterprise\_user.enterprise\_name

```ts
enterprise_name: string;
```

##### enterprise\_user.id

```ts
id: string;
```

##### enterprise\_user.is\_admin

```ts
is_admin: boolean;
```

##### enterprise\_user.is\_owner

```ts
is_owner: boolean;
```

##### enterprise\_user.teams

```ts
teams: string[];
```

#### has\_2fa?

```ts
optional has_2fa: boolean;
```

#### has\_files?

```ts
optional has_files: boolean;
```

#### id

```ts
id: string;
```

#### is\_admin

```ts
is_admin: boolean;
```

#### is\_app\_user

```ts
is_app_user: boolean;
```

#### is\_bot

```ts
is_bot: boolean;
```

#### is\_email\_confirmed

```ts
is_email_confirmed: boolean;
```

#### is\_invited\_user?

```ts
optional is_invited_user: boolean;
```

#### is\_owner

```ts
is_owner: boolean;
```

#### is\_primary\_owner

```ts
is_primary_owner: boolean;
```

#### is\_restricted

```ts
is_restricted: boolean;
```

#### is\_stranger?

```ts
optional is_stranger: boolean;
```

#### is\_ultra\_restricted

```ts
is_ultra_restricted: boolean;
```

#### is\_workflow\_bot?

```ts
optional is_workflow_bot: boolean;
```

#### locale

```ts
locale: string;
```

#### name

```ts
name: string;
```

#### presence?

```ts
optional presence: string;
```

#### profile

```ts
profile: object;
```

##### profile.avatar\_hash

```ts
avatar_hash: string;
```

##### profile.display\_name

```ts
display_name: string;
```

##### profile.display\_name\_normalized

```ts
display_name_normalized: string;
```

##### profile.email?

```ts
optional email: string;
```

##### profile.fields

```ts
fields: 
  | null
  | []
  | {
[key: string]: object;
};
```

##### profile.first\_name

```ts
first_name: string;
```

##### profile.huddle\_state

```ts
huddle_state: string;
```

##### profile.huddle\_state\_expiration\_ts

```ts
huddle_state_expiration_ts: number;
```

##### profile.image\_1024?

```ts
optional image_1024: string;
```

##### profile.image\_192

```ts
image_192: string;
```

##### profile.image\_24

```ts
image_24: string;
```

##### profile.image\_32

```ts
image_32: string;
```

##### profile.image\_48

```ts
image_48: string;
```

##### profile.image\_512

```ts
image_512: string;
```

##### profile.image\_72

```ts
image_72: string;
```

##### profile.image\_original?

```ts
optional image_original: string;
```

##### profile.is\_custom\_image?

```ts
optional is_custom_image: boolean;
```

##### profile.last\_name

```ts
last_name: string;
```

##### profile.phone

```ts
phone: string;
```

##### profile.real\_name

```ts
real_name: string;
```

##### profile.real\_name\_normalized

```ts
real_name_normalized: string;
```

##### profile.skype

```ts
skype: string;
```

##### profile.status\_emoji

```ts
status_emoji: string;
```

##### profile.status\_emoji\_display\_info

```ts
status_emoji_display_info: StatusEmojiDisplayInfo[];
```

##### profile.status\_expiration

```ts
status_expiration: number;
```

##### profile.status\_text

```ts
status_text: string;
```

##### profile.status\_text\_canonical

```ts
status_text_canonical: string;
```

##### profile.team

```ts
team: string;
```

##### profile.title

```ts
title: string;
```

#### real\_name

```ts
real_name: string;
```

#### team\_id

```ts
team_id: string;
```

#### two\_factor\_type?

```ts
optional two_factor_type: string;
```

#### tz

```ts
tz: string;
```

#### tz\_label

```ts
tz_label: string;
```

#### tz\_offset

```ts
tz_offset: number;
```

#### updated

```ts
updated: number;
```

#### who\_can\_share\_contact\_card

```ts
who_can_share_contact_card: string;
```
