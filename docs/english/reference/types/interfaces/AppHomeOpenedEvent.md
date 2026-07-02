[@slack/types](../index.md) / AppHomeOpenedEvent

# Interface: AppHomeOpenedEvent

Defined in: [events/app.ts:67](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L67)

## Properties

### channel

```ts
channel: string;
```

Defined in: [events/app.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L70)

***

### context?

```ts
optional context: object;
```

Defined in: [events/app.ts:73](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L73)

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

Defined in: [events/app.ts:74](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L74)

***

### tab?

```ts
optional tab: "home" | "messages";
```

Defined in: [events/app.ts:71](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L71)

***

### type

```ts
type: "app_home_opened";
```

Defined in: [events/app.ts:68](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L68)

***

### user

```ts
user: string;
```

Defined in: [events/app.ts:69](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L69)

***

### view?

```ts
optional view: View;
```

Defined in: [events/app.ts:72](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/app.ts#L72)
