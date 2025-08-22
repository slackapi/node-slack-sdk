[@slack/web-api](../index.md) / AdminEmojiListResponse

# Type Alias: AdminEmojiListResponse

```ts
type AdminEmojiListResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/AdminEmojiListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminEmojiListResponse.ts#L11)

## Type declaration

### emoji?

```ts
optional emoji: object;
```

#### Index Signature

```ts
[key: string]: Emoji
```

### error?

```ts
optional error: string;
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
