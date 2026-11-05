[@slack/web-api](../index.md) / AppsUserConnectionBulkUpdateResponse

# Type Alias: AppsUserConnectionBulkUpdateResponse

```ts
type AppsUserConnectionBulkUpdateResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/AppsUserConnectionBulkUpdateResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/AppsUserConnectionBulkUpdateResponse.ts#L11)

## Type Declaration

### changed\_user\_ids?

```ts
optional changed_user_ids?: string[];
```

### error?

```ts
optional error?: string;
```

### failures?

```ts
optional failures?: Failure[];
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

### response\_metadata?

```ts
optional response_metadata?: ResponseMetadata;
```

### warning?

```ts
optional warning?: string;
```
