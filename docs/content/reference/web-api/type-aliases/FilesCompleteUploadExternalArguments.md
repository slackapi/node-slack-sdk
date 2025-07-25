[@slack/web-api](../index.md) / FilesCompleteUploadExternalArguments

# Type Alias: FilesCompleteUploadExternalArguments

```ts
type FilesCompleteUploadExternalArguments = FileDestinationArgument & TokenOverridable & object;
```

Defined in: [src/types/request/files.ts:66](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L66)

## Type declaration

### blocks?

```ts
optional blocks: (KnownBlock | Block)[];
```

#### Description

An array of structured rich text blocks. If the `initial_comment` field is provided, the `blocks` field is ignored.

#### Example

```ts
[{"type": "section", "text": {"type": "plain_text", "text": "Hello world"}}]
```

#### See

[https://docs.slack.dev/reference/block-kit/blocks](https://docs.slack.dev/reference/block-kit/blocks)

### files

```ts
files: [FileUploadComplete, ...FileUploadComplete[]];
```

#### Description

Array of file IDs and their corresponding (optional) titles.

#### Example

```ts
[{"id":"F044GKUHN9Z", "title":"slack-test"}]
```

### initial\_comment?

```ts
optional initial_comment: string;
```

#### Description

The message text introducing the file in the specified channel.
