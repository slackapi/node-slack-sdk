[@slack/web-api](../index.md) / ChatPostMessageResponse

# Type Alias: ChatPostMessageResponse

```ts
type ChatPostMessageResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/ChatPostMessageResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ChatPostMessageResponse.ts#L11)

## Type Declaration

### channel?

```ts
channel?: string;
```

### deprecated\_argument?

```ts
deprecated_argument?: string;
```

### error?

```ts
error?: string;
```

### errors?

```ts
errors?: string[];
```

### message?

```ts
message?: ChatPostMessageResponseMessage;
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

### ts?

```ts
ts?: string;
```

### warning?

```ts
warning?: string;
```
