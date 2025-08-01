[@slack/web-api](../index.md) / AdminTeamsListResponse

# Type Alias: AdminTeamsListResponse

```ts
type AdminTeamsListResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/AdminTeamsListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminTeamsListResponse.ts#L11)

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

### teams?

```ts
optional teams: Team[];
```
