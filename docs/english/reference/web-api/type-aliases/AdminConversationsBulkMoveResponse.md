[@slack/web-api](../index.md) / AdminConversationsBulkMoveResponse

# Type Alias: AdminConversationsBulkMoveResponse

```ts
type AdminConversationsBulkMoveResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/AdminConversationsBulkMoveResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminConversationsBulkMoveResponse.ts#L11)

## Type declaration

### bulk\_action\_id?

```ts
optional bulk_action_id: string;
```

### error?

```ts
optional error: string;
```

### needed?

```ts
optional needed: string;
```

### not\_added?

```ts
optional not_added: NotAdded[];
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
