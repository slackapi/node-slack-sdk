[@slack/web-api](../index.md) / AdminUsersSessionResetBulkArguments

# Interface: AdminUsersSessionResetBulkArguments

Defined in: [packages/web-api/src/types/request/admin/users.ts:139](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L139)

## Extends

- `UserIDs`
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

### user\_ids

```ts
user_ids: [string, ...string[]];
```

Defined in: [packages/web-api/src/types/request/common.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L92)

#### Description

List of encoded user IDs.

#### Inherited from

`UserIDs.user_ids`

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
