[@slack/web-api](../index.md) / UsersInfoArguments

# Interface: UsersInfoArguments

Defined in: [packages/web-api/src/types/request/users.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L37)

## Extends

- `TokenOverridable`
- `LocaleAware`

## Properties

### include\_locale?

```ts
include_locale?: boolean;
```

Defined in: [packages/web-api/src/types/request/common.ts:51](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L51)

#### Description

Set this to `true` to receive the locale with the response.

#### Inherited from

`LocaleAware.include_locale`

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

***

### user

```ts
user: string;
```

Defined in: [packages/web-api/src/types/request/users.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L39)

#### Description

User to get info on.
