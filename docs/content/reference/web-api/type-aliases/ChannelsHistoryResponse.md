# Type Alias: ChannelsHistoryResponse

```ts
type ChannelsHistoryResponse: WebAPICallResult & object;
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

### latest?

```ts
optional latest: string;
```

### messages?

```ts
optional messages: Message[];
```

### needed?

```ts
optional needed: string;
```

### ok?

```ts
optional ok: boolean;
```

### provided?

```ts
optional provided: string;
```

### response\_metadata?

```ts
optional response_metadata: ResponseMetadata;
```

### warning?

```ts
optional warning: string;
```

## Defined in

[packages/web-api/src/types/response/ChannelsHistoryResponse.ts:12](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/response/ChannelsHistoryResponse.ts#L12)
