[@slack/web-api](../index.md) / TeamAccessLogsResponse

# Type Alias: TeamAccessLogsResponse

```ts
type TeamAccessLogsResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/TeamAccessLogsResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/TeamAccessLogsResponse.ts#L11)

## Type declaration

### error?

```ts
optional error: string;
```

### logins?

```ts
optional logins: Login[];
```

### needed?

```ts
optional needed: string;
```

### ok?

```ts
optional ok: boolean;
```

### paging?

```ts
optional paging: Paging;
```

### provided?

```ts
optional provided: string;
```

### response\_metadata?

```ts
optional response_metadata: ResponseMetadata;
```
