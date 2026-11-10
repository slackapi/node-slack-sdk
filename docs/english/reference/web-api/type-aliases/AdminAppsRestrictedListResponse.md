[@slack/web-api](../index.md) / AdminAppsRestrictedListResponse

# Type Alias: AdminAppsRestrictedListResponse

```ts
type AdminAppsRestrictedListResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/AdminAppsRestrictedListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminAppsRestrictedListResponse.ts#L11)

## Type Declaration

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

### response\_metadata?

```ts
response_metadata?: ResponseMetadata;
```

### restricted\_apps?

```ts
restricted_apps?: RestrictedApp[];
```

### warning?

```ts
warning?: string;
```
