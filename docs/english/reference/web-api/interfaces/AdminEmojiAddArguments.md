[@slack/web-api](../index.md) / AdminEmojiAddArguments

# Interface: AdminEmojiAddArguments

Defined in: [src/types/request/admin/emoji.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/emoji.ts#L14)

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

***

### url

```ts
url: string;
```

Defined in: [src/types/request/admin/emoji.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/emoji.ts#L19)

#### Description

The URL of a file to use as an image for the emoji.
Square images under 128KB and with transparent backgrounds work best.
