[@slack/web-api](../index.md) / AppsUserConnectionBulkUpdateResponse

# Type Alias: AppsUserConnectionBulkUpdateResponse

```ts
type AppsUserConnectionBulkUpdateResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/AppsUserConnectionBulkUpdateResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AppsUserConnectionBulkUpdateResponse.ts#L11)

## Type Declaration

### changed\_user\_ids?

```ts
changed_user_ids?: string[];
```

### error?

```ts
error?: string;
```

### failures?

```ts
failures?: Failure[];
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

### response\_metadata?

```ts
response_metadata?: ResponseMetadata;
```

### warning?

```ts
warning?: string;
```
