[@slack/web-api](../index.md) / FilesRemoteAddArguments

# Interface: FilesRemoteAddArguments

Defined in: [src/types/request/files.ts:215](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L215)

## Extends

- `SharedFile`.`FileType`.`ExternalIDArgument`.`TokenOverridable`

## Properties

### external\_id

```ts
external_id: string;
```

Defined in: [src/types/request/files.ts:18](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L18)

#### Description

Creator defined GUID for the file.

#### Inherited from

```ts
ExternalIDArgument.external_id
```

***

### external\_url

```ts
external_url: string;
```

Defined in: [src/types/request/files.ts:204](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L204)

#### Description

URL of the remote file.

#### Inherited from

```ts
SharedFile.external_url
```

***

### filetype?

```ts
optional filetype: string;
```

Defined in: [src/types/request/files.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L32)

#### Description

A file type identifier.

#### See

[File types](https://docs.slack.dev/reference/objects/file-object) for a complete list of supported file types.

#### Inherited from

```ts
FileType.filetype
```

***

### indexable\_file\_contents?

```ts
optional indexable_file_contents: Buffer<ArrayBufferLike> | Stream;
```

Defined in: [src/types/request/files.ts:211](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L211)

#### Description

A text file (txt, pdf, doc, etc.) containing textual search terms that are used to improve discovery
of the remote file.

#### Inherited from

```ts
SharedFile.indexable_file_contents
```

***

### preview\_image?

```ts
optional preview_image: Buffer<ArrayBufferLike> | Stream;
```

Defined in: [src/types/request/files.ts:206](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L206)

#### Description

Preview of the document.

#### Inherited from

```ts
SharedFile.preview_image
```

***

### title

```ts
title: string;
```

Defined in: [src/types/request/files.ts:202](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L202)

#### Description

Title of the file being shared.

#### Inherited from

```ts
SharedFile.title
```

***

### token?

```ts
optional token: string;
```

Defined in: [src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```
