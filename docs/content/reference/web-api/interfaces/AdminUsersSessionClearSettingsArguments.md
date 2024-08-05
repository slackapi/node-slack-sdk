# Interface: AdminUsersSessionClearSettingsArguments

## Extends

- `UserIDs`.`TokenOverridable`

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L43)

***

### user\_ids

```ts
user_ids: [string, ...string[]];
```

#### Description

List of encoded user IDs.

#### Inherited from

`UserIDs.user_ids`

#### Defined in

[packages/web-api/src/types/request/common.ts:83](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L83)
