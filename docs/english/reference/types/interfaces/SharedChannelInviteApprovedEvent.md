[@slack/types](../index.md) / SharedChannelInviteApprovedEvent

# Interface: SharedChannelInviteApprovedEvent

Defined in: [events/shared-channel.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L61)

## Properties

### approving\_team\_id

```ts
approving_team_id: string;
```

Defined in: [events/shared-channel.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L65)

***

### approving\_user

```ts
approving_user: SharedChannelUserItem;
```

Defined in: [events/shared-channel.ts:67](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L67)

***

### channel

```ts
channel: SharedChannelItem;
```

Defined in: [events/shared-channel.ts:64](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L64)

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/shared-channel.ts:68](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L68)

***

### invite

```ts
invite: SharedChannelInviteItem;
```

Defined in: [events/shared-channel.ts:63](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L63)

***

### teams\_in\_channel

```ts
teams_in_channel: SharedChannelTeamItem[];
```

Defined in: [events/shared-channel.ts:66](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L66)

***

### type

```ts
type: "shared_channel_invite_approved";
```

Defined in: [events/shared-channel.ts:62](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/shared-channel.ts#L62)
