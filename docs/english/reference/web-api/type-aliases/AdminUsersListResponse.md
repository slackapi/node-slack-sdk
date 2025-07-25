[@slack/web-api](../index.md) / AdminUsersListResponse

# Type Alias: AdminUsersListResponse

```ts
type AdminUsersListResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/AdminUsersListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminUsersListResponse.ts#L11)

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

### users?

```ts
optional users: User[];
```
