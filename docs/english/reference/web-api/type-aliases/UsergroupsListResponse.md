[@slack/web-api](../index.md) / UsergroupsListResponse

# Type Alias: UsergroupsListResponse

```ts
type UsergroupsListResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/UsergroupsListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/UsergroupsListResponse.ts#L11)

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

### usergroups?

```ts
optional usergroups: Usergroup[];
```
