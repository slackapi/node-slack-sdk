[@slack/web-api](../index.md) / AdminWorkflowsPermissionsLookupResponse

# Type Alias: AdminWorkflowsPermissionsLookupResponse

```ts
type AdminWorkflowsPermissionsLookupResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/AdminWorkflowsPermissionsLookupResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminWorkflowsPermissionsLookupResponse.ts#L11)

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
