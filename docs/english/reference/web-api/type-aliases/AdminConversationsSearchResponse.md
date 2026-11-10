[@slack/web-api](../index.md) / AdminConversationsSearchResponse

# Type Alias: AdminConversationsSearchResponse

```ts
type AdminConversationsSearchResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/AdminConversationsSearchResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminConversationsSearchResponse.ts#L11)

## Type Declaration

### conversations?

```ts
conversations?: Conversation[];
```

### error?

```ts
error?: string;
```

### needed?

```ts
needed?: string;
```

### next\_cursor?

```ts
next_cursor?: string;
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

### total\_count?

```ts
total_count?: number;
```

### warning?

```ts
warning?: string;
```
