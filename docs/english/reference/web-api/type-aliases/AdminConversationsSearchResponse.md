[@slack/web-api](../index.md) / AdminConversationsSearchResponse

# Type Alias: AdminConversationsSearchResponse

```ts
type AdminConversationsSearchResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/AdminConversationsSearchResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminConversationsSearchResponse.ts#L11)

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
