# Interface: FilesRemoteAddArguments

## Extends

- `SharedFile`.`FileType`.`ExternalIDArgument`.`TokenOverridable`

## Properties

### external\_id

```ts
external_id: string;
```

#### Description

Creator defined GUID for the file.

#### Inherited from

`ExternalIDArgument.external_id`

#### Defined in

[packages/web-api/src/types/request/files.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L17)

***

### external\_url

```ts
external_url: string;
```

#### Description

URL of the remote file.

#### Inherited from

`SharedFile.external_url`

#### Defined in

[packages/web-api/src/types/request/files.ts:180](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L180)

***

### filetype?

```ts
optional filetype: string;
```

#### Description

A file type identifier.

#### See

[File types](https://api.slack.com/types/file#file_types) for a complete list of supported file types.

#### Inherited from

`FileType.filetype`

#### Defined in

[packages/web-api/src/types/request/files.ts:31](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L31)

***

### indexable\_file\_contents?

```ts
optional indexable_file_contents: Buffer | Stream;
```

#### Description

A text file (txt, pdf, doc, etc.) containing textual search terms that are used to improve discovery
of the remote file.

#### Inherited from

`SharedFile.indexable_file_contents`

#### Defined in

[packages/web-api/src/types/request/files.ts:187](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L187)

***

### preview\_image?

```ts
optional preview_image: Buffer | Stream;
```

#### Description

Preview of the document.

#### Inherited from

`SharedFile.preview_image`

#### Defined in

[packages/web-api/src/types/request/files.ts:182](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L182)

***

### title

```ts
title: string;
```

#### Description

Title of the file being shared.

#### Inherited from

`SharedFile.title`

#### Defined in

[packages/web-api/src/types/request/files.ts:178](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L178)

***

### token?

```ts
optional token: string;
```

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`

#### Defined in

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)
