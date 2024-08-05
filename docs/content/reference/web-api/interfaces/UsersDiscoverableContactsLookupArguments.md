# Interface: UsersDiscoverableContactsLookupArguments

## Extends

- `Email`.`TokenOverridable`

## Properties

### email

```ts
email: string;
```

#### Description

An email address belonging to a user in the workspace

#### Inherited from

`Email.email`

#### Defined in

[packages/web-api/src/types/request/users.ts:7](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/users.ts#L7)

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
