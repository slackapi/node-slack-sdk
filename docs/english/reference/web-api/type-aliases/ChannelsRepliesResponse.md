[@slack/web-api](../index.md) / ChannelsRepliesResponse

# Type Alias: ChannelsRepliesResponse

```ts
type ChannelsRepliesResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/ChannelsRepliesResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ChannelsRepliesResponse.ts#L11)

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
