[@slack/web-api](../index.md) / GroupsHistoryResponse

# Type Alias: GroupsHistoryResponse

```ts
type GroupsHistoryResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/GroupsHistoryResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/GroupsHistoryResponse.ts#L11)

## Type Declaration

### channel\_actions\_count?

```ts
channel_actions_count?: number;
```

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
