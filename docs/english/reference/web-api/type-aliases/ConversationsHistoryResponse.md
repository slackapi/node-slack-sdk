[@slack/web-api](../index.md) / ConversationsHistoryResponse

# Type Alias: ConversationsHistoryResponse

```ts
type ConversationsHistoryResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/ConversationsHistoryResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ConversationsHistoryResponse.ts#L11)

## Type Declaration

### channel\_actions\_count?

```ts
channel_actions_count?: number;
```

### channel\_actions\_ts?

```ts
channel_actions_ts?: number;
```

### error?

```ts
error?: string;
```

### has\_more?

```ts
has_more?: boolean;
```

### latest?

```ts
latest?: string;
```

### messages?

```ts
messages?: MessageElement[];
```

### needed?

```ts
needed?: string;
```

### ok?

```ts
ok?: boolean;
```

### oldest?

```ts
oldest?: string;
```

### pin\_count?

```ts
pin_count?: number;
```

### provided?

```ts
provided?: string;
```

### response\_metadata?

```ts
response_metadata?: ResponseMetadata;
```

### warning?

```ts
warning?: string;
```
