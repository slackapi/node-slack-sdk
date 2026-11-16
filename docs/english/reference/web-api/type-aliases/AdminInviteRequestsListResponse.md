[@slack/web-api](../index.md) / AdminInviteRequestsListResponse

# Type Alias: AdminInviteRequestsListResponse

```ts
type AdminInviteRequestsListResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/AdminInviteRequestsListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminInviteRequestsListResponse.ts#L11)

## Type Declaration

### error?

```ts
error?: string;
```

### invite\_requests?

```ts
invite_requests?: InviteRequest[];
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
