[@slack/web-api](../index.md) / ChatScheduleMessageResponse

# Type Alias: ChatScheduleMessageResponse

```ts
type ChatScheduleMessageResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/ChatScheduleMessageResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ChatScheduleMessageResponse.ts#L11)

## Type declaration

### channel?

```ts
optional channel: string;
```

### error?

```ts
optional error: string;
```

### message?

```ts
optional message: Message;
```

### needed?

```ts
optional needed: string;
```

### ok?

```ts
optional ok: boolean;
```

### post\_at?

```ts
optional post_at: number;
```

### provided?

```ts
optional provided: string;
```

### response\_metadata?

```ts
optional response_metadata: ResponseMetadata;
```

### scheduled\_message\_id?

```ts
optional scheduled_message_id: string;
```
