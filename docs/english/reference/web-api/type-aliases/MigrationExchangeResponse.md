[@slack/web-api](../index.md) / MigrationExchangeResponse

# Type Alias: MigrationExchangeResponse

```ts
type MigrationExchangeResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/MigrationExchangeResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/MigrationExchangeResponse.ts#L11)

## Type Declaration

### enterprise\_id?

```ts
enterprise_id?: string;
```

### error?

```ts
error?: string;
```

### invalid\_user\_ids?

```ts
invalid_user_ids?: string[];
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

### team\_id?

```ts
team_id?: string;
```

### user\_id\_map?

```ts
user_id_map?: object;
```

#### Index Signature

```ts
[key: string]: string
```

### warning?

```ts
warning?: string;
```
