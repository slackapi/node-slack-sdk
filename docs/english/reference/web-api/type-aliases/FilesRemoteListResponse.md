[@slack/web-api](../index.md) / FilesRemoteListResponse

# Type Alias: FilesRemoteListResponse

```ts
type FilesRemoteListResponse = WebAPICallResult & object;
```

Defined in: [src/types/response/FilesRemoteListResponse.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/response/FilesRemoteListResponse.ts#L11)

## Type Declaration

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

### provided?

```ts
optional provided: string;
```

### response\_metadata?

```ts
optional response_metadata: ResponseMetadata;
```
