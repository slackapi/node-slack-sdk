[@slack/web-api](../index.md) / AdminRolesListAssignmentsResponse

# Type Alias: AdminRolesListAssignmentsResponse

```ts
type AdminRolesListAssignmentsResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/AdminRolesListAssignmentsResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminRolesListAssignmentsResponse.ts#L11)

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

### role\_assignments?

```ts
optional role_assignments: RoleAssignment[];
```
