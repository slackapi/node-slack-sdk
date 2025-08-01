[@slack/web-api](../index.md) / GroupsListResponse

# Type Alias: GroupsListResponse

```ts
type GroupsListResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/GroupsListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/GroupsListResponse.ts#L11)

## Type declaration

### error?

```ts
optional error: string;
```

### groups?

```ts
optional groups: Group[];
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
