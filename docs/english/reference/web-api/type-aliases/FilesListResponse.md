[@slack/web-api](../index.md) / FilesListResponse

# Type Alias: FilesListResponse

```ts
type FilesListResponse = WebAPICallResult & object;
```

Defined in: [packages/web-api/src/types/response/FilesListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/FilesListResponse.ts#L11)

## Type Declaration

### error?

```ts
error?: string;
```

### files?

```ts
files?: File[];
```

### needed?

```ts
needed?: string;
```

### ok?

```ts
ok?: boolean;
```

### paging?

```ts
paging?: Paging;
```

### provided?

```ts
provided?: string;
```

### warning?

```ts
warning?: string;
```
