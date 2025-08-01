[@slack/types](../index.md) / DNDUpdatedUserEvent

# Interface: DNDUpdatedUserEvent

Defined in: [events/dnd.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/dnd.ts#L15)

## Properties

### dnd\_status

```ts
dnd_status: object;
```

Defined in: [events/dnd.ts:18](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/dnd.ts#L18)

#### dnd\_enabled

```ts
dnd_enabled: boolean;
```

#### next\_dnd\_end\_ts

```ts
next_dnd_end_ts: number;
```

#### next\_dnd\_start\_ts

```ts
next_dnd_start_ts: number;
```

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/dnd.ts:23](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/dnd.ts#L23)

***

### type

```ts
type: "dnd_updated_user";
```

Defined in: [events/dnd.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/dnd.ts#L16)

***

### user

```ts
user: string;
```

Defined in: [events/dnd.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/dnd.ts#L17)
