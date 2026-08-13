[@slack/web-api](../index.md) / AppHomeOpenedEvent

# Interface: AppHomeOpenedEvent

Defined in: packages/types/dist/events/app.d.ts:65

## Properties

### channel

```ts
channel: string;
```

Defined in: packages/types/dist/events/app.d.ts:68

***

### context?

```ts
optional context: object;
```

Defined in: packages/types/dist/events/app.d.ts:71

#### entities?

```ts
optional entities: 
  | {
  type: "slack#/types/channel_id";
  value: string;
}
  | {
  type: "slack#/types/canvas_id";
  value: string;
}
  | {
  type: "slack#/types/list_id";
  value: string;
}
  | {
  type: "slack#/types/message_context";
  value: {
     channel_id: string;
     message_ts: string;
  };
} & object[];
```

***

### event\_ts

```ts
event_ts: string;
```

Defined in: packages/types/dist/events/app.d.ts:72

***

### tab?

```ts
optional tab: "home" | "messages";
```

Defined in: packages/types/dist/events/app.d.ts:69

***

### type

```ts
type: "app_home_opened";
```

Defined in: packages/types/dist/events/app.d.ts:66

***

### user

```ts
user: string;
```

Defined in: packages/types/dist/events/app.d.ts:67

***

### view?

```ts
optional view: View;
```

Defined in: packages/types/dist/events/app.d.ts:70
