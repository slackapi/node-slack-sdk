[@slack/types](../index.md) / AppContextChangedEvent

# Interface: AppContextChangedEvent

Defined in: [events/app.ts:221](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L221)

## Properties

### channel

```ts
channel: string;
```

Defined in: [events/app.ts:223](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L223)

***

### context

```ts
context: object;
```

Defined in: [events/app.ts:225](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L225)

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

Defined in: [events/app.ts:251](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L251)

***

### type

```ts
type: "app_context_changed";
```

Defined in: [events/app.ts:222](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L222)

***

### user

```ts
user: string;
```

Defined in: [events/app.ts:224](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L224)
