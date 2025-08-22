[@slack/web-api](../index.md) / TeamExternalTeamsListResponse

# Type Alias: TeamExternalTeamsListResponse

```ts
type TeamExternalTeamsListResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/TeamExternalTeamsListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/TeamExternalTeamsListResponse.ts#L11)

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

### organizations?

```ts
optional organizations: Organization[];
```

### provided?

```ts
optional provided: string;
```

### response\_metadata?

```ts
optional response_metadata: ResponseMetadata;
```

### total\_count?

```ts
optional total_count: number;
```
