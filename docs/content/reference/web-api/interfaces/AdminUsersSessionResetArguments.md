# Interface: AdminUsersSessionResetArguments

## Extends

- `UserID`.`SessionExpirationTarget`.`TokenOverridable`

## Properties

### mobile\_only?

```ts
optional mobile_only: boolean;
```

#### Description

Only expire mobile sessions. Defaults to `false`.

#### Inherited from

`SessionExpirationTarget.mobile_only`

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:29](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/users.ts#L29)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L43)

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

[packages/web-api/src/types/request/admin/users.ts:14](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/users.ts#L14)

***

### web\_only?

```ts
optional web_only: boolean;
```

#### Description

Only expire web sessions. Defaults to `false`.

#### Inherited from

`SessionExpirationTarget.web_only`

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:31](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/users.ts#L31)
