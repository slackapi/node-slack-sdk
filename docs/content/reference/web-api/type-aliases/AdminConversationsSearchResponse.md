# Type Alias: AdminConversationsSearchResponse

```ts
type AdminConversationsSearchResponse: WebAPICallResult & object;
```

## Type declaration

### conversations?

```ts
optional conversations: Conversation[];
```

### error?

```ts
optional error: string;
```

### needed?

```ts
optional needed: string;
```

### next\_cursor?

```ts
optional next_cursor: string;
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

### total\_count?

```ts
optional total_count: number;
```

## Defined in

[packages/web-api/src/types/response/AdminConversationsSearchResponse.ts:12](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/response/AdminConversationsSearchResponse.ts#L12)
