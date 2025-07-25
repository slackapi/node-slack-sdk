[@slack/web-api](../index.md) / AdminEmojiAddAliasArguments

# Interface: AdminEmojiAddAliasArguments

Defined in: [src/types/request/admin/emoji.ts:23](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/emoji.ts#L23)

## Extends

- `Name`.`TokenOverridable`

## Properties

### alias\_for

```ts
alias_for: string;
```

Defined in: [src/types/request/admin/emoji.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/emoji.ts#L28)

#### Description

Name of the emoji for which the alias is being made.
Any wrapping whitespace or colons will be automatically trimmed.

***

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
