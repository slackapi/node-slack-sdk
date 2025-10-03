[@slack/web-api](../index.md) / AdminWorkflowsPermissionsLookupResponse

# Type Alias: AdminWorkflowsPermissionsLookupResponse

```ts
type AdminWorkflowsPermissionsLookupResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/AdminWorkflowsPermissionsLookupResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminWorkflowsPermissionsLookupResponse.ts#L11)

## Type Declaration

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

### permissions?

```ts
optional permissions: object;
```

#### Index Signature

```ts
[key: string]: Permission
```

### provided?

```ts
optional provided: string;
```
