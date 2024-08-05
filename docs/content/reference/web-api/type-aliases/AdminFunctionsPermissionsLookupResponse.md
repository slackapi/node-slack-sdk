# Type Alias: AdminFunctionsPermissionsLookupResponse

```ts
type AdminFunctionsPermissionsLookupResponse: WebAPICallResult & object;
```

## Type declaration

### error?

```ts
optional error: string;
```

### errors?

```ts
optional errors: Errors;
```

### needed?

```ts
optional needed: string;
```

### ok?

```ts
optional ok: boolean;
```

### permissions?

```ts
optional permissions: object;
```

#### Index Signature

 \[`key`: `string`\]: `Permission`

### provided?

```ts
optional provided: string;
```

### response\_metadata?

```ts
optional response_metadata: ResponseMetadata;
```

## Defined in

[packages/web-api/src/types/response/AdminFunctionsPermissionsLookupResponse.ts:12](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/response/AdminFunctionsPermissionsLookupResponse.ts#L12)
