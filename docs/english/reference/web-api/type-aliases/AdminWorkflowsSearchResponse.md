[@slack/web-api](../index.md) / AdminWorkflowsSearchResponse

# Type Alias: AdminWorkflowsSearchResponse

```ts
type AdminWorkflowsSearchResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/AdminWorkflowsSearchResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AdminWorkflowsSearchResponse.ts#L11)

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
