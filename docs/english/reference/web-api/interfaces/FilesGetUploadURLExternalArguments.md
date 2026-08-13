[@slack/web-api](../index.md) / FilesGetUploadURLExternalArguments

# Interface: FilesGetUploadURLExternalArguments

Defined in: [packages/web-api/src/types/request/files.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L92)

## Extends

- `TokenOverridable`

## Properties

### alt\_text?

```ts
optional alt_text: string;
```

Defined in: [packages/web-api/src/types/request/files.ts:98](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L98)

#### Description

Description of image for screen-reader.

***

### filename

```ts
filename: string;
```

Defined in: [packages/web-api/src/types/request/files.ts:94](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L94)

#### Description

Name of the file being uploaded.

***

### length

```ts
length: number;
```

Defined in: [packages/web-api/src/types/request/files.ts:96](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L96)

#### Description

Size in bytes of the file being uploaded.

***

### snippet\_type?

```ts
optional snippet_type: string;
```

Defined in: [packages/web-api/src/types/request/files.ts:100](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L100)

#### Description

Syntax type of the snippet being uploaded. E.g. `python`.

***

### token?

```ts
optional token: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```
