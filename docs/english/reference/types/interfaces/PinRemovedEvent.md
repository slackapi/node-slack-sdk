[@slack/types](../index.md) / PinRemovedEvent

# Interface: PinRemovedEvent

Defined in: [events/pin.ts:46](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L46)

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [events/pin.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L49)

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/pin.ts:59](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L59)

***

### has\_pins

```ts
has_pins: boolean;
```

Defined in: [events/pin.ts:58](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L58)

***

### item

```ts
item: PinnedItem;
```

Defined in: [events/pin.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L50)

***

### item\_user

```ts
item_user: string;
```

Defined in: [events/pin.ts:51](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L51)

***

### pin\_count

```ts
pin_count: string;
```

Defined in: [events/pin.ts:52](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L52)

***

### pinned\_info

```ts
pinned_info: object;
```

Defined in: [events/pin.ts:53](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L53)

#### channel

```ts
channel: string;
```

#### pinned\_by

```ts
pinned_by: string;
```

#### pinned\_ts

```ts
pinned_ts: number;
```

***

### type

```ts
type: "pin_removed";
```

Defined in: [events/pin.ts:47](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L47)

***

### user

```ts
user: string;
```

Defined in: [events/pin.ts:48](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L48)
