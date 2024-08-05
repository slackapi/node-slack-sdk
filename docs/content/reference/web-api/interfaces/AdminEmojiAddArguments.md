# Interface: AdminEmojiAddArguments

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

***

### url

```ts
url: string;
```

#### Description

The URL of a file to use as an image for the emoji.
Square images under 128KB and with transparent backgrounds work best.

#### Defined in

[packages/web-api/src/types/request/admin/emoji.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/emoji.ts#L19)
