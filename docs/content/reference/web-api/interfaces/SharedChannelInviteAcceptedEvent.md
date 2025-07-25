[@slack/web-api](../index.md) / SharedChannelInviteAcceptedEvent

# Interface: SharedChannelInviteAcceptedEvent

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:45

## Properties

### accepting\_user

```ts
accepting_user: SharedChannelUserItem;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:51

***

### approval\_required

```ts
approval_required: boolean;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:47

***

### channel

```ts
channel: SharedChannelItem;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:49

***

### event\_ts

```ts
event_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:52

***

### invite

```ts
invite: SharedChannelInviteItem;
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:48

***

### teams\_in\_channel

```ts
teams_in_channel: SharedChannelTeamItem[];
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:50

***

### type

```ts
type: "shared_channel_invite_accepted";
```

Defined in: node\_modules/@slack/types/dist/events/shared-channel.d.ts:46
