[@slack/web-api](../index.md) / ConversationsInviteResponse

# Type Alias: ConversationsInviteResponse

```ts
type ConversationsInviteResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/ConversationsInviteResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ConversationsInviteResponse.ts#L11)

## Type declaration

### channel?

```ts
optional channel: Channel;
```

### error?

```ts
optional error: string;
```

### errors?

```ts
optional errors: Error[];
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
