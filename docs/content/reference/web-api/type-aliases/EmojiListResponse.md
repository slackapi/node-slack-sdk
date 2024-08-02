# Type Alias: EmojiListResponse

```ts
type EmojiListResponse: WebAPICallResult & object;
```

## Type declaration

### cache\_ts?

```ts
optional cache_ts: string;
```

### categories?

```ts
optional categories: Category[];
```

### categories\_version?

```ts
optional categories_version: string;
```

### emoji?

```ts
optional emoji: object;
```

#### Index Signature

 \[`key`: `string`\]: `string`

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

## Defined in

[packages/web-api/src/types/response/EmojiListResponse.ts:12](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/response/EmojiListResponse.ts#L12)
