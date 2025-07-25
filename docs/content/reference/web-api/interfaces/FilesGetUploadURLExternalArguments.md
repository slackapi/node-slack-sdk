[@slack/web-api](../index.md) / FilesGetUploadURLExternalArguments

# Interface: FilesGetUploadURLExternalArguments

Defined in: [src/types/request/files.ts:87](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L87)

## Extends

- `TokenOverridable`

## Properties

### alt\_text?

```ts
optional alt_text: string;
```

Defined in: [src/types/request/files.ts:93](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L93)

#### Description

Description of image for screen-reader.

***

### filename

```ts
filename: string;
```

Defined in: [src/types/request/files.ts:89](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L89)

#### Description

Name of the file being uploaded.

***

### length

```ts
length: number;
```

Defined in: [src/types/request/files.ts:91](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L91)

#### Description

Size in bytes of the file being uploaded.

***

### snippet\_type?

```ts
optional snippet_type: string;
```

Defined in: [src/types/request/files.ts:95](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L95)

#### Description

Syntax type of the snippet being uploaded. E.g. `python`.

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
