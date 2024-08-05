# Interface: AdminUsersSetExpirationArguments

## Extends

- `UserID`.`TokenOverridable`.`OptionalTeamAssignable`

## Properties

### expiration\_ts

```ts
expiration_ts: number;
```

#### Description

Epoch timestamp in seconds when guest account should be disabled.

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:139](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/users.ts#L139)

***

### team\_id?

```ts
optional team_id: string;
```

#### Description

If using an org token, `team_id` is required.

#### Inherited from

`OptionalTeamAssignable.team_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:65](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L65)

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

### user\_id

```ts
user_id: string;
```

#### Description

The ID of the user.

#### Inherited from

`UserID.user_id`

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:14](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/users.ts#L14)
