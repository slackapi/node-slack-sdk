[@slack/web-api](../index.md) / FilesCommentsDeleteArguments

# Interface: FilesCommentsDeleteArguments

Defined in: [src/types/request/files.ts:196](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L196)

## Extends

- `FileArgument`.`TokenOverridable`

## Properties

### file

```ts
file: string;
```

Defined in: [src/types/request/files.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L14)

#### Description

Encoded file ID.

#### Inherited from

```ts
FileArgument.file
```

***

### id

```ts
id: string;
```

Defined in: [src/types/request/files.ts:198](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/files.ts#L198)

#### Description

The ID of the comment to delete.

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
