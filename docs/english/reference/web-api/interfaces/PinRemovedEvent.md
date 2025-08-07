[@slack/web-api](../index.md) / PinRemovedEvent

# Interface: PinRemovedEvent

Defined in: node\_modules/@slack/types/dist/events/pin.d.ts:44

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: node\_modules/@slack/types/dist/events/pin.d.ts:47

***

### event\_ts

```ts
event_ts: string;
```

Defined in: node\_modules/@slack/types/dist/events/pin.d.ts:57

***

### has\_pins

```ts
has_pins: boolean;
```

Defined in: node\_modules/@slack/types/dist/events/pin.d.ts:56

***

### item

```ts
item: PinnedItem;
```

Defined in: node\_modules/@slack/types/dist/events/pin.d.ts:48

***

### item\_user

```ts
item_user: string;
```

Defined in: node\_modules/@slack/types/dist/events/pin.d.ts:49

***

### pin\_count

```ts
pin_count: string;
```

Defined in: node\_modules/@slack/types/dist/events/pin.d.ts:50

***

### pinned\_info

```ts
pinned_info: object;
```

Defined in: node\_modules/@slack/types/dist/events/pin.d.ts:51

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

Defined in: node\_modules/@slack/types/dist/events/pin.d.ts:45

***

### user

```ts
user: string;
```

Defined in: node\_modules/@slack/types/dist/events/pin.d.ts:46
