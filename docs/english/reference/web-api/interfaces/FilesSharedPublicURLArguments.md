[@slack/web-api](../index.md) / FilesSharedPublicURLArguments

# Interface: FilesSharedPublicURLArguments

Defined in: [packages/web-api/src/types/request/files.ts:135](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L135)

## Extends

- `FileArgument`
- `TokenOverridable`

## Properties

### file

```ts
file: string;
```

Defined in: [packages/web-api/src/types/request/files.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L14)

#### Description

Encoded file ID.

#### Inherited from

`FileArgument.file`

***

### token?

```ts
token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`
