[@slack/web-api](../index.md) / AdminUsersGetExpirationArguments

# Interface: AdminUsersGetExpirationArguments

Defined in: [packages/web-api/src/types/request/admin/users.ts:63](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L63)

## Extends

- `TokenOverridable`

## Properties

### target\_team?

```ts
optional target_team?: string;
```

Defined in: [packages/web-api/src/types/request/admin/users.ts:69](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L69)

#### Description

If an org token is passed in and this team is on the org, it will operate on the workspace level
on the specified team. Otherwise it will operate on the org or team in context.

***

### token?

```ts
optional token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```

***

### user\_id?

```ts
optional user_id?: string;
```

Defined in: [packages/web-api/src/types/request/admin/users.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L65)

#### Description

The ID of the guest user to get the expiration for.
