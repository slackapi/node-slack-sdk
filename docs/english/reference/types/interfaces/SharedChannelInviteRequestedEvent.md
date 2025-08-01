[@slack/types](../index.md) / SharedChannelInviteRequestedEvent

# Interface: SharedChannelInviteRequestedEvent

Defined in: [events/shared-channel.ts:103](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L103)

## Properties

### actor

```ts
actor: object;
```

Defined in: [events/shared-channel.ts:105](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L105)

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

Defined in: [events/shared-channel.ts:132](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L132)

***

### channel\_id

```ts
channel_id: string;
```

Defined in: [events/shared-channel.ts:114](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L114)

***

### channel\_message\_latest\_counted\_timestamp

```ts
channel_message_latest_counted_timestamp: number;
```

Defined in: [events/shared-channel.ts:133](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L133)

***

### channel\_name

```ts
channel_name: string;
```

Defined in: [events/shared-channel.ts:116](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L116)

***

### channel\_type

```ts
channel_type: "private" | "public";
```

Defined in: [events/shared-channel.ts:117](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L117)

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/shared-channel.ts:134](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L134)

***

### event\_type

```ts
event_type: "slack#/events/shared_channel_invite_requested";
```

Defined in: [events/shared-channel.ts:115](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L115)

***

### is\_external\_limited

```ts
is_external_limited: boolean;
```

Defined in: [events/shared-channel.ts:131](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L131)

***

### target\_users

```ts
target_users: [{
  email: string;
  invite_id: string;
}];
```

Defined in: [events/shared-channel.ts:118](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L118)

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

Defined in: [events/shared-channel.ts:119](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L119)

***

### type

```ts
type: "shared_channel_invite_requested";
```

Defined in: [events/shared-channel.ts:104](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L104)
