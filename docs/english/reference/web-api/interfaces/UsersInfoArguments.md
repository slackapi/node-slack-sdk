[@slack/web-api](../index.md) / UsersInfoArguments

# Interface: UsersInfoArguments

Defined in: [src/types/request/users.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L37)

## Extends

- `TokenOverridable`.`LocaleAware`

## Properties

### include\_locale?

```ts
optional include_locale: boolean;
```

Defined in: [src/types/request/common.ts:51](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L51)

#### Description

Set this to `true` to receive the locale with the response.

#### Inherited from

```ts
LocaleAware.include_locale
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

### user

```ts
user: string;
```

Defined in: [src/types/request/users.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L39)

#### Description

User to get info on.
