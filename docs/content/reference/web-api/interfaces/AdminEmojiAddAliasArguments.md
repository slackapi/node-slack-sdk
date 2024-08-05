# Interface: AdminEmojiAddAliasArguments

## Extends

- `Name`.`TokenOverridable`

## Properties

### alias\_for

```ts
alias_for: string;
```

#### Description

Name of the emoji for which the alias is being made.
Any wrapping whitespace or colons will be automatically trimmed.

#### Defined in

[packages/web-api/src/types/request/admin/emoji.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/emoji.ts#L28)

***

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
