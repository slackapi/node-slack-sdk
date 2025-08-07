[@slack/web-api](../index.md) / AdminEmojiRenameArguments

# Interface: AdminEmojiRenameArguments

Defined in: [src/types/request/admin/emoji.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/emoji.ts#L38)

## Extends

- `Name`.`TokenOverridable`

## Properties

### name

```ts
name: string;
```

Defined in: [src/types/request/admin/emoji.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/emoji.ts#L10)

#### Description

The name of the emoji. Colons (:myemoji:) around the value are not required,
although they may be included.

#### Inherited from

```ts
Name.name
```

***

### new\_name

```ts
new_name: string;
```

Defined in: [src/types/request/admin/emoji.ts:40](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/emoji.ts#L40)

#### Description

The new name of the emoji.

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
