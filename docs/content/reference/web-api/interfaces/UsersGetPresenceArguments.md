# Interface: UsersGetPresenceArguments

## Extends

- `TokenOverridable`

## Properties

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

### user?

```ts
optional user: string;
```

#### Description

User to get presence info on. Defaults to the authed user.

#### Defined in

[packages/web-api/src/types/request/users.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L32)
