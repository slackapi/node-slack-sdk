# Type Alias: FilesCompleteUploadExternalArguments

```ts
type FilesCompleteUploadExternalArguments: FileDestinationArgument & TokenOverridable & object;
```

## Type declaration

### files

```ts
files: [FileUploadComplete, ...FileUploadComplete[]];
```

#### Description

Array of file IDs and their corresponding (optional) titles.

### initial\_comment?

```ts
optional initial_comment: string;
```

#### Description

The message text introducing the file in the specified channel.

## Defined in

[packages/web-api/src/types/request/files.ts:65](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/files.ts#L65)
