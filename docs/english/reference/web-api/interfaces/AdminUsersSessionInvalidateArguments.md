[@slack/web-api](../index.md) / AdminUsersSessionInvalidateArguments

# Interface: AdminUsersSessionInvalidateArguments

Defined in: [src/types/request/admin/users.ts:115](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L115)

## Extends

- `TeamID`.`TokenOverridable`

## Properties

### session\_id

```ts
session_id: string;
```

Defined in: [src/types/request/admin/users.ts:117](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L117)

#### Description

ID of the session to invalidate.

***

### team\_id

```ts
team_id: string;
```

Defined in: [src/types/request/common.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L61)

#### Description

The encoded team ID.

#### Inherited from

```ts
TeamID.team_id
```

***

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
