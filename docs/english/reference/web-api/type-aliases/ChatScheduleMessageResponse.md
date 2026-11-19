[@slack/web-api](../index.md) / ChatScheduleMessageResponse

# Type Alias: ChatScheduleMessageResponse

```ts
type ChatScheduleMessageResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/ChatScheduleMessageResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ChatScheduleMessageResponse.ts#L11)

## Type Declaration

### channel?

```ts
channel?: string;
```

### error?

```ts
error?: string;
```

### message?

```ts
message?: Message;
```

### needed?

```ts
needed?: string;
```

### ok?

```ts
ok?: boolean;
```

### post\_at?

```ts
post_at?: number;
```

### provided?

```ts
provided?: string;
```

### response\_metadata?

```ts
response_metadata?: ResponseMetadata;
```

### scheduled\_message\_id?

```ts
scheduled_message_id?: string;
```

### warning?

```ts
warning?: string;
```
