[@slack/web-api](../index.md) / SharedChannelInviteApprovedEvent

# Interface: SharedChannelInviteApprovedEvent

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:58

## Properties

### approving\_team\_id

```ts
approving_team_id: string;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:62

***

### approving\_user

```ts
approving_user: SharedChannelUserItem;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:64

***

### channel

```ts
channel: SharedChannelItem;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:61

***

### event\_ts

```ts
event_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:65

***

### invite

```ts
invite: SharedChannelInviteItem;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:60

***

### teams\_in\_channel

```ts
teams_in_channel: SharedChannelTeamItem[];
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:63

***

### type

```ts
type: "shared_channel_invite_approved";
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:59
