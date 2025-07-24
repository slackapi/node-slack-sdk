[@slack/web-api](../index.md) / FilesUploadV2Arguments

# Type Alias: FilesUploadV2Arguments

```ts
type FilesUploadV2Arguments = TokenOverridable & 
  | FileUploadV2
  | Omit<FileUploadV2, "file" | "content"> & FilesUploadV2ArgumentsMultipleFiles;
```

Defined in: [src/types/request/files.ts:183](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L183)
