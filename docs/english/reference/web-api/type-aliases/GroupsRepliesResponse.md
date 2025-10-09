[@slack/web-api](../index.md) / GroupsRepliesResponse

# Type Alias: GroupsRepliesResponse

```ts
type GroupsRepliesResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/GroupsRepliesResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/GroupsRepliesResponse.ts#L11)

## Type Declaration

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
