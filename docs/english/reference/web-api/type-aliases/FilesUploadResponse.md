[@slack/web-api](../index.md) / FilesUploadResponse

# Type Alias: FilesUploadResponse

```ts
type FilesUploadResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/FilesUploadResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/FilesUploadResponse.ts#L11)

## Type declaration

### error?

```ts
optional error: string;
```

### file?

```ts
optional file: File;
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
