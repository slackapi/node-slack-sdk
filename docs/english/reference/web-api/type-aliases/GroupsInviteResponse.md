[@slack/web-api](../index.md) / GroupsInviteResponse

# Type Alias: GroupsInviteResponse

```ts
type GroupsInviteResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/GroupsInviteResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/GroupsInviteResponse.ts#L11)

## Type declaration

### error?

```ts
optional error: string;
```

### group?

```ts
optional group: Group;
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
