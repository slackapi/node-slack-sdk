[@slack/types](../index.md) / PinAddedEvent

# Interface: PinAddedEvent

Defined in: [events/pin.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L32)

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [events/pin.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L35)

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/pin.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L44)

***

### item

```ts
item: PinnedItem;
```

Defined in: [events/pin.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L36)

***

### item\_user

```ts
item_user: string;
```

Defined in: [events/pin.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L37)

***

### pin\_count

```ts
pin_count: string;
```

Defined in: [events/pin.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L38)

***

### pinned\_info

```ts
pinned_info: object;
```

Defined in: [events/pin.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L39)

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
type: "pin_added";
```

Defined in: [events/pin.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L33)

***

### user

```ts
user: string;
```

Defined in: [events/pin.ts:34](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/pin.ts#L34)
