# Type Alias: ImHistoryResponse

```ts
type ImHistoryResponse: WebAPICallResult & object;
```

## Type declaration

### channel\_actions\_count?

```ts
optional channel_actions_count: number;
```

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

## Defined in

[packages/web-api/src/types/response/ImHistoryResponse.ts:12](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/response/ImHistoryResponse.ts#L12)
