[@slack/web-api](../index.md) / DndTeamInfoResponse

# Type Alias: DndTeamInfoResponse

```ts
type DndTeamInfoResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/DndTeamInfoResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/DndTeamInfoResponse.ts#L11)

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

### users?

```ts
users?: object;
```

#### Index Signature

```ts
[key: string]: User
```

### warning?

```ts
warning?: string;
```
