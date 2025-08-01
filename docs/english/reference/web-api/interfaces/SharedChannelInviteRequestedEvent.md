[@slack/web-api](../index.md) / SharedChannelInviteRequestedEvent

# Interface: SharedChannelInviteRequestedEvent

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:94

## Properties

### actor

```ts
actor: object;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:96

#### display\_name

```ts
display_name: string;
```

#### id

```ts
id: string;
```

#### is\_bot

```ts
is_bot: boolean;
```

#### name

```ts
name: string;
```

#### real\_name

```ts
real_name: string;
```

#### team\_id

```ts
team_id: string;
```

#### timezone

```ts
timezone: string;
```

***

### channel\_date\_created

```ts
channel_date_created: number;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:129

***

### channel\_id

```ts
channel_id: string;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:105

***

### channel\_message\_latest\_counted\_timestamp

```ts
channel_message_latest_counted_timestamp: number;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:130

***

### channel\_name

```ts
channel_name: string;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:107

***

### channel\_type

```ts
channel_type: "private" | "public";
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:108

***

### event\_ts

```ts
event_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:131

***

### event\_type

```ts
event_type: "slack#/events/shared_channel_invite_requested";
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:106

***

### is\_external\_limited

```ts
is_external_limited: boolean;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:128

***

### target\_users

```ts
target_users: [{
  email: string;
  invite_id: string;
}];
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:109

***

### teams\_in\_channel

```ts
teams_in_channel: [{
  avatar_base_url: string;
  date_created: number;
  domain: string;
  icon: {
     image_34: string;
     image_default: boolean;
  };
  id: string;
  is_verified: boolean;
  name: string;
  requires_sponsorship: boolean;
}];
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:113

***

### type

```ts
type: "shared_channel_invite_requested";
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:95
