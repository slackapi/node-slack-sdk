[@slack/web-api](../index.md) / ConversationsRepliesResponse

# Type Alias: ConversationsRepliesResponse

```ts
type ConversationsRepliesResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/ConversationsRepliesResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ConversationsRepliesResponse.ts#L11)

## Type Declaration

### error?

```ts
error?: string;
```

### has\_more?

```ts
has_more?: boolean;
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
