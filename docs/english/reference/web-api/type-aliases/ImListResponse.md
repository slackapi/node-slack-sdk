[@slack/web-api](../index.md) / ImListResponse

# Type Alias: ImListResponse

```ts
type ImListResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/ImListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/ImListResponse.ts#L11)

## Type declaration

### error?

```ts
optional error: string;
```

### ims?

```ts
optional ims: Im[];
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
