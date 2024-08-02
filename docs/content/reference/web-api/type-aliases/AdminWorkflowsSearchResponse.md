# Type Alias: AdminWorkflowsSearchResponse

```ts
type AdminWorkflowsSearchResponse: WebAPICallResult & object;
```

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

### total\_found?

```ts
optional total_found: number;
```

### workflows?

```ts
optional workflows: Workflow[];
```

## Defined in

[packages/web-api/src/types/response/AdminWorkflowsSearchResponse.ts:12](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/response/AdminWorkflowsSearchResponse.ts#L12)
