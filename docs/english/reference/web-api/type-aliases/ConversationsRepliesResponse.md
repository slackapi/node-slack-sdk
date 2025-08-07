[@slack/web-api](../index.md) / ConversationsRepliesResponse

# Type Alias: ConversationsRepliesResponse

```ts
type ConversationsRepliesResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/ConversationsRepliesResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ConversationsRepliesResponse.ts#L11)

## Type declaration

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

### provided?

```ts
optional provided: string;
```

### response\_metadata?

```ts
optional response_metadata: ResponseMetadata;
```
