[@slack/web-api](../index.md) / ChatPostMessageResponse

# Type Alias: ChatPostMessageResponse

```ts
type ChatPostMessageResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/ChatPostMessageResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ChatPostMessageResponse.ts#L11)

## Type declaration

### channel?

```ts
optional channel: string;
```

### deprecated\_argument?

```ts
optional deprecated_argument: string;
```

### error?

```ts
optional error: string;
```

### errors?

```ts
optional errors: string[];
```

### message?

```ts
optional message: ChatPostMessageResponseMessage;
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

### ts?

```ts
optional ts: string;
```
