[@slack/web-api](../index.md) / AdminAppsRestrictedListResponse

# Type Alias: AdminAppsRestrictedListResponse

```ts
type AdminAppsRestrictedListResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/AdminAppsRestrictedListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminAppsRestrictedListResponse.ts#L11)

## Type declaration

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

### restricted\_apps?

```ts
optional restricted_apps: RestrictedApp[];
```

### warning?

```ts
optional warning: string;
```
