# Interface: FilesGetUploadURLExternalArguments

## Extends

- `TokenOverridable`

## Properties

### alt\_text?

```ts
optional alt_text: string;
```

#### Description

Description of image for screen-reader.

#### Defined in

[packages/web-api/src/types/request/files.ts:82](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/files.ts#L82)

***

### filename

```ts
filename: string;
```

#### Description

Name of the file being uploaded.

#### Defined in

[packages/web-api/src/types/request/files.ts:78](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/files.ts#L78)

***

### length

```ts
length: number;
```

#### Description

Size in bytes of the file being uploaded.

#### Defined in

[packages/web-api/src/types/request/files.ts:80](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/files.ts#L80)

***

### snippet\_type?

```ts
optional snippet_type: string;
```

#### Description

Syntax type of the snippet being uploaded. E.g. `python`.

#### Defined in

[packages/web-api/src/types/request/files.ts:84](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/files.ts#L84)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L43)
