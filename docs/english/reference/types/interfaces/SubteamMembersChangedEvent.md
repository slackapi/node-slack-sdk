[@slack/types](../index.md) / SubteamMembersChangedEvent

# Interface: SubteamMembersChangedEvent

Defined in: [events/subteam.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/subteam.ts#L37)

## Properties

### added\_users?

```ts
optional added_users: string[];
```

Defined in: [events/subteam.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/subteam.ts#L43)

***

### added\_users\_count?

```ts
optional added_users_count: number;
```

Defined in: [events/subteam.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/subteam.ts#L44)

***

### date\_previous\_update

```ts
date_previous_update: number;
```

Defined in: [events/subteam.ts:41](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/subteam.ts#L41)

***

### date\_update

```ts
date_update: number;
```

Defined in: [events/subteam.ts:42](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/subteam.ts#L42)

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/subteam.ts:47](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/subteam.ts#L47)

***

### removed\_users?

```ts
optional removed_users: string[];
```

Defined in: [events/subteam.ts:45](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/subteam.ts#L45)

***

### removed\_users\_count?

```ts
optional removed_users_count: number;
```

Defined in: [events/subteam.ts:46](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/subteam.ts#L46)

***

### subteam\_id

```ts
subteam_id: string;
```

Defined in: [events/subteam.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/subteam.ts#L39)

***

### team\_id

```ts
team_id: string;
```

Defined in: [events/subteam.ts:40](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/subteam.ts#L40)

***

### type

```ts
type: "subteam_members_changed";
```

Defined in: [events/subteam.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/subteam.ts#L38)
