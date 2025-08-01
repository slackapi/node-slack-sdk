[@slack/web-api](../index.md) / ConversationsListResponse

# Type Alias: ConversationsListResponse

```ts
type ConversationsListResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/ConversationsListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ConversationsListResponse.ts#L11)

## Type declaration

### channels?

```ts
optional channels: Channel[];
```

### error?

```ts
optional error: string;
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
