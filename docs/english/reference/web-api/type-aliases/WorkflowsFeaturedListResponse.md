[@slack/web-api](../index.md) / WorkflowsFeaturedListResponse

# Type Alias: WorkflowsFeaturedListResponse

```ts
type WorkflowsFeaturedListResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/WorkflowsFeaturedListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/WorkflowsFeaturedListResponse.ts#L11)

## Type Declaration

### error?

```ts
error?: string;
```

### featured\_workflows?

```ts
featured_workflows?: FeaturedWorkflow[];
```

### invalid\_channel\_ids?

```ts
invalid_channel_ids?: string[];
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

### warning?

```ts
warning?: string;
```
