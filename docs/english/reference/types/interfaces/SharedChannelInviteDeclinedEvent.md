[@slack/types](../index.md) / SharedChannelInviteDeclinedEvent

# Interface: SharedChannelInviteDeclinedEvent

Defined in: [events/shared-channel.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L76)

## Properties

### channel

```ts
channel: SharedChannelItem;
```

Defined in: [events/shared-channel.ts:79](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L79)

***

### declining\_team\_id

```ts
declining_team_id: string;
```

Defined in: [events/shared-channel.ts:80](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L80)

***

### declining\_user

```ts
declining_user: SharedChannelUserItem;
```

Defined in: [events/shared-channel.ts:82](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L82)

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/shared-channel.ts:83](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L83)

***

### invite

```ts
invite: SharedChannelInviteItem;
```

Defined in: [events/shared-channel.ts:78](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L78)

***

### teams\_in\_channel

```ts
teams_in_channel: SharedChannelTeamItem[];
```

Defined in: [events/shared-channel.ts:81](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L81)

***

### type

```ts
type: "shared_channel_invite_declined";
```

Defined in: [events/shared-channel.ts:77](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L77)
