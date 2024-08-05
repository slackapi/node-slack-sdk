# Interface: AdminEmojiRenameArguments

## Extends

- `Name`.`TokenOverridable`

## Properties

### name

```ts
name: string;
```

#### Description

The name of the emoji. Colons (:myemoji:) around the value are not required,
although they may be included.

#### Inherited from

`Name.name`

#### Defined in

[packages/web-api/src/types/request/admin/emoji.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/emoji.ts#L10)

***

### new\_name

```ts
new_name: string;
```

#### Description

The new name of the emoji.

#### Defined in

[packages/web-api/src/types/request/admin/emoji.ts:40](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/emoji.ts#L40)

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
