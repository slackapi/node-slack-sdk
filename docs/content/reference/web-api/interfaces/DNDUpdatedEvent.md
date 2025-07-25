[@slack/web-api](../index.md) / DNDUpdatedEvent

# Interface: DNDUpdatedEvent

Defined in: node\_modules/@slack/types/dist/events/dnd.d.ts:1

## Properties

### dnd\_status

```ts
dnd_status: object;
```

Defined in: node\_modules/@slack/types/dist/events/dnd.d.ts:4

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

Defined in: node\_modules/@slack/types/dist/events/dnd.d.ts:12

***

### type

```ts
type: "dnd_updated";
```

Defined in: node\_modules/@slack/types/dist/events/dnd.d.ts:2

***

### user

```ts
user: string;
```

Defined in: node\_modules/@slack/types/dist/events/dnd.d.ts:3
