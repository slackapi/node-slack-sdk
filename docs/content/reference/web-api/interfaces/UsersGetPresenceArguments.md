[@slack/web-api](../index.md) / UsersGetPresenceArguments

# Interface: UsersGetPresenceArguments

Defined in: [src/types/request/users.ts:30](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L30)

## Extends

- `TokenOverridable`

## Properties

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

### user?

```ts
optional user: string;
```

Defined in: [src/types/request/users.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L32)

#### Description

User to get presence info on. Defaults to the authed user.
