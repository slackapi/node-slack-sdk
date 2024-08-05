# Interface: UsersInfoArguments

## Extends

- `TokenOverridable`.`LocaleAware`

## Properties

### include\_locale?

```ts
optional include_locale: boolean;
```

#### Description

Set this to `true` to receive the locale with the response.

#### Inherited from

`LocaleAware.include_locale`

#### Defined in

[packages/web-api/src/types/request/common.ts:51](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L51)

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

***

### user

```ts
user: string;
```

#### Description

User to get info on.

#### Defined in

[packages/web-api/src/types/request/users.ts:39](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/users.ts#L39)
