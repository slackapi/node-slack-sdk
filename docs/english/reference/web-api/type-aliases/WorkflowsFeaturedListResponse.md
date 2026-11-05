[@slack/web-api](../index.md) / WorkflowsFeaturedListResponse

# Type Alias: WorkflowsFeaturedListResponse

```ts
type WorkflowsFeaturedListResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/WorkflowsFeaturedListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/WorkflowsFeaturedListResponse.ts#L11)

## Type Declaration

### error?

```ts
optional error?: string;
```

### featured\_workflows?

```ts
optional featured_workflows?: FeaturedWorkflow[];
```

### invalid\_channel\_ids?

```ts
optional invalid_channel_ids?: string[];
```

### needed?

```ts
optional needed?: string;
```

### ok?

```ts
optional ok?: boolean;
```

### provided?

```ts
optional provided?: string;
```

### warning?

```ts
optional warning?: string;
```
