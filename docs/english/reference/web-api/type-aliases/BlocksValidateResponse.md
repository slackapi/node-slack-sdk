[@slack/web-api](../index.md) / BlocksValidateResponse

# Type Alias: BlocksValidateResponse

```ts
type BlocksValidateResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/BlocksValidateResponse.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/BlocksValidateResponse.ts#L12)

## Type Declaration

### error?

```ts
optional error?: string;
```

### errors?

```ts
optional errors?: Error[];
```

### needed?

```ts
optional needed?: string;
```

### ok?

```ts
optional ok?: boolean;
```

### provided?

```ts
optional provided?: string;
```

### response\_metadata?

```ts
optional response_metadata?: ResponseMetadata;
```

### warning?

```ts
optional warning?: string;
```
