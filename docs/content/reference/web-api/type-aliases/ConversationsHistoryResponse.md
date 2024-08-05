# Type Alias: ConversationsHistoryResponse

```ts
type ConversationsHistoryResponse: WebAPICallResult & object;
```

## Type declaration

### channel\_actions\_count?

```ts
optional channel_actions_count: number;
```

### channel\_actions\_ts?

```ts
optional channel_actions_ts: number;
```

### error?

```ts
optional error: string;
```

### has\_more?

```ts
optional has_more: boolean;
```

### messages?

```ts
optional messages: MessageElement[];
```

### needed?

```ts
optional needed: string;
```

### ok?

```ts
optional ok: boolean;
```

### oldest?

```ts
optional oldest: string;
```

### pin\_count?

```ts
optional pin_count: number;
```

### provided?

```ts
optional provided: string;
```

### response\_metadata?

```ts
optional response_metadata: ResponseMetadata;
```

## Defined in

[packages/web-api/src/types/response/ConversationsHistoryResponse.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ConversationsHistoryResponse.ts#L12)
