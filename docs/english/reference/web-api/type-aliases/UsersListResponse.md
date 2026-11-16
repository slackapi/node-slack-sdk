[@slack/web-api](../index.md) / UsersListResponse

# Type Alias: UsersListResponse

```ts
type UsersListResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/UsersListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/UsersListResponse.ts#L11)

## Type Declaration

### cache\_ts?

```ts
cache_ts?: number;
```

### error?

```ts
error?: string;
```

### members?

```ts
members?: Member[];
```

### needed?

```ts
needed?: string;
```

### offset?

```ts
offset?: string;
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

### warning?

```ts
warning?: string;
```
