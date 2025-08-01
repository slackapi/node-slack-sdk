[@slack/types](../index.md) / DNDUpdatedEvent

# Interface: DNDUpdatedEvent

Defined in: [events/dnd.ts:1](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/dnd.ts#L1)

## Properties

### dnd\_status

```ts
dnd_status: object;
```

Defined in: [events/dnd.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/dnd.ts#L4)

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

#### snooze\_enabled

```ts
snooze_enabled: boolean;
```

#### snooze\_endtime

```ts
snooze_endtime: number;
```

#### snooze\_remaining

```ts
snooze_remaining: number;
```

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/dnd.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/dnd.ts#L12)

***

### type

```ts
type: "dnd_updated";
```

Defined in: [events/dnd.ts:2](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/dnd.ts#L2)

***

### user

```ts
user: string;
```

Defined in: [events/dnd.ts:3](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/dnd.ts#L3)
