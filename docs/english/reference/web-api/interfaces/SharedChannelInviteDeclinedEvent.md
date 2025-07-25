[@slack/web-api](../index.md) / SharedChannelInviteDeclinedEvent

# Interface: SharedChannelInviteDeclinedEvent

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:71

## Properties

### channel

```ts
channel: SharedChannelItem;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:74

***

### declining\_team\_id

```ts
declining_team_id: string;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:75

***

### declining\_user

```ts
declining_user: SharedChannelUserItem;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:77

***

### event\_ts

```ts
event_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:78

***

### invite

```ts
invite: SharedChannelInviteItem;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:73

***

### teams\_in\_channel

```ts
teams_in_channel: SharedChannelTeamItem[];
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:76

***

### type

```ts
type: "shared_channel_invite_declined";
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:72
