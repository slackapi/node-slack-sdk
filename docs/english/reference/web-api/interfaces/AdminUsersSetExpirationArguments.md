[@slack/web-api](../index.md) / AdminUsersSetExpirationArguments

# Interface: AdminUsersSetExpirationArguments

Defined in: [src/types/request/admin/users.ts:146](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L146)

## Extends

- `UserID`.`TokenOverridable`.`OptionalTeamAssignable`

## Properties

### expiration\_ts

```ts
expiration_ts: number;
```

Defined in: [src/types/request/admin/users.ts:148](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L148)

#### Description

Epoch timestamp in seconds when guest account should be disabled.

***

### team\_id?

```ts
optional team_id: string;
```

Defined in: [src/types/request/common.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L70)

#### Description

If using an org token, `team_id` is required.

#### Inherited from

```ts
OptionalTeamAssignable.team_id
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

***

### user\_id

```ts
user_id: string;
```

Defined in: [src/types/request/common.ts:96](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L96)

#### Description

Encoded user ID.

#### Inherited from

```ts
UserID.user_id
```
