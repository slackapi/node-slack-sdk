[@slack/types](../index.md) / LinkSharedEvent

# Interface: LinkSharedEvent

Defined in: [events/link-shared.ts:1](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/link-shared.ts#L1)

## Properties

### channel

```ts
channel: string;
```

Defined in: [events/link-shared.ts:3](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/link-shared.ts#L3)

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/link-shared.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/link-shared.ts#L14)

***

### is\_bot\_user\_member

```ts
is_bot_user_member: boolean;
```

Defined in: [events/link-shared.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/link-shared.ts#L4)

***

### links

```ts
links: object[];
```

Defined in: [events/link-shared.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/link-shared.ts#L8)

#### domain

```ts
domain: string;
```

#### url

```ts
url: string;
```

***

### message\_ts

```ts
message_ts: string;
```

Defined in: [events/link-shared.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/link-shared.ts#L6)

***

### source?

```ts
optional source: string;
```

Defined in: [events/link-shared.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/link-shared.ts#L13)

***

### thread\_ts?

```ts
optional thread_ts: string;
```

Defined in: [events/link-shared.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/link-shared.ts#L7)

***

### type

```ts
type: "link_shared";
```

Defined in: [events/link-shared.ts:2](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/link-shared.ts#L2)

***

### unfurl\_id?

```ts
optional unfurl_id: string;
```

Defined in: [events/link-shared.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/link-shared.ts#L12)

***

### user

```ts
user: string;
```

Defined in: [events/link-shared.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/link-shared.ts#L5)
