[@slack/web-api](../index.md) / FilesListResponse

# Type Alias: FilesListResponse

```ts
type FilesListResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/FilesListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/FilesListResponse.ts#L11)

## Type declaration

### error?

```ts
optional error: string;
```

### files?

```ts
optional files: File[];
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
