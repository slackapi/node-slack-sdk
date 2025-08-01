[@slack/web-api](../index.md) / AdminUsersSessionClearSettingsArguments

# Interface: AdminUsersSessionClearSettingsArguments

Defined in: [src/types/request/admin/users.ts:109](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L109)

## Extends

- `UserIDs`.`TokenOverridable`

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

### user\_ids

```ts
user_ids: [string, ...string[]];
```

Defined in: [src/types/request/common.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L92)

#### Description

List of encoded user IDs.

#### Inherited from

```ts
UserIDs.user_ids
```
