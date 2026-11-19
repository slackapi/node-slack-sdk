[@slack/web-api](../index.md) / AdminFunctionsPermissionsLookupResponse

# Type Alias: AdminFunctionsPermissionsLookupResponse

```ts
type AdminFunctionsPermissionsLookupResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/AdminFunctionsPermissionsLookupResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminFunctionsPermissionsLookupResponse.ts#L11)

## Type Declaration

### error?

```ts
error?: string;
```

### errors?

```ts
errors?: Errors;
```

### metadata?

```ts
metadata?: object;
```

#### Index Signature

```ts
[key: string]: Errors
```

### needed?

```ts
needed?: string;
```

### ok?

```ts
ok?: boolean;
```

### permissions?

```ts
permissions?: object;
```

#### Index Signature

```ts
[key: string]: Permission
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
