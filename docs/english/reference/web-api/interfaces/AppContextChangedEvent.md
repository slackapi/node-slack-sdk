[@slack/web-api](../index.md) / AppContextChangedEvent

# Interface: AppContextChangedEvent

Defined in: packages/types/dist/events/app.d.ts:202

## Properties

### channel

```ts
channel: string;
```

Defined in: packages/types/dist/events/app.d.ts:204

***

### context

```ts
context: object;
```

Defined in: packages/types/dist/events/app.d.ts:206

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

Defined in: packages/types/dist/events/app.d.ts:227

***

### type

```ts
type: "app_context_changed";
```

Defined in: packages/types/dist/events/app.d.ts:203

***

### user

```ts
user: string;
```

Defined in: packages/types/dist/events/app.d.ts:205
