# Type Alias: MigrationExchangeResponse

```ts
type MigrationExchangeResponse: WebAPICallResult & object;
```

## Type declaration

### enterprise\_id?

```ts
optional enterprise_id: string;
```

### error?

```ts
optional error: string;
```

### invalid\_user\_ids?

```ts
optional invalid_user_ids: string[];
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

### team\_id?

```ts
optional team_id: string;
```

### user\_id\_map?

```ts
optional user_id_map: object;
```

#### Index Signature

 \[`key`: `string`\]: `string`

### warning?

```ts
optional warning: string;
```

## Defined in

[packages/web-api/src/types/response/MigrationExchangeResponse.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/MigrationExchangeResponse.ts#L12)
