[@slack/web-api](../index.md) / EmojiListResponse

# Type Alias: EmojiListResponse

```ts
type EmojiListResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/EmojiListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/EmojiListResponse.ts#L11)

## Type Declaration

### cache\_ts?

```ts
cache_ts?: string;
```

### categories?

```ts
categories?: Category[];
```

### categories\_version?

```ts
categories_version?: string;
```

### emoji?

```ts
emoji?: object;
```

#### Index Signature

```ts
[key: string]: string
```

### error?

```ts
error?: string;
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

### warning?

```ts
warning?: string;
```
