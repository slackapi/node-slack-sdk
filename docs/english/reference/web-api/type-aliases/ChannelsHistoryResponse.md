[@slack/web-api](../index.md) / ChannelsHistoryResponse

# Type Alias: ChannelsHistoryResponse

```ts
type ChannelsHistoryResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/ChannelsHistoryResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ChannelsHistoryResponse.ts#L11)

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
messages?: Message[];
```

### needed?

```ts
needed?: string;
```

### ok?

```ts
ok?: boolean;
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
