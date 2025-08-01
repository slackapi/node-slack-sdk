[@slack/web-api](../index.md) / DndTeamInfoResponse

# Type Alias: DndTeamInfoResponse

```ts
type DndTeamInfoResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/DndTeamInfoResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/DndTeamInfoResponse.ts#L11)

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

### users?

```ts
optional users: object;
```

#### Index Signature

```ts
[key: string]: User
```
