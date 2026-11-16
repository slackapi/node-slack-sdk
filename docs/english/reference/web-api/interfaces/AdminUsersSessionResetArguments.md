[@slack/web-api](../index.md) / AdminUsersSessionResetArguments

# Interface: AdminUsersSessionResetArguments

Defined in: [packages/web-api/src/types/request/admin/users.ts:136](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L136)

## Extends

- `UserID`
- `SessionExpirationTarget`
- `TokenOverridable`

## Properties

### mobile\_only?

```ts
mobile_only?: boolean;
```

Defined in: [packages/web-api/src/types/request/admin/users.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L25)

#### Description

Only expire mobile sessions. Defaults to `false`.

#### Inherited from

`SessionExpirationTarget.mobile_only`

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

### user\_id

```ts
user_id: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:96](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L96)

#### Description

Encoded user ID.

#### Inherited from

`UserID.user_id`

***

### web\_only?

```ts
web_only?: boolean;
```

Defined in: [packages/web-api/src/types/request/admin/users.ts:27](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L27)

#### Description

Only expire web sessions. Defaults to `false`.

#### Inherited from

`SessionExpirationTarget.web_only`
