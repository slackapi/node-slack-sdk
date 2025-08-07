[@slack/web-api](../index.md) / ImRepliesResponse

# Type Alias: ImRepliesResponse

```ts
type ImRepliesResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/ImRepliesResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ImRepliesResponse.ts#L11)

## Type declaration

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
