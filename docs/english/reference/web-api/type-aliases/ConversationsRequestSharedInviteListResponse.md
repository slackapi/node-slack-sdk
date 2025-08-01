[@slack/web-api](../index.md) / ConversationsRequestSharedInviteListResponse

# Type Alias: ConversationsRequestSharedInviteListResponse

```ts
type ConversationsRequestSharedInviteListResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/ConversationsRequestSharedInviteListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ConversationsRequestSharedInviteListResponse.ts#L11)

## Type declaration

### error?

```ts
optional error: string;
```

### invite\_requests?

```ts
optional invite_requests: InviteRequest[];
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
