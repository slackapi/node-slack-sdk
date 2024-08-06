# Interface: AdminUsersUnsupportedVersionsExportArguments

## Extends

- `TokenOverridable`

## Properties

### date\_end\_of\_support?

```ts
optional date_end_of_support: number;
```

#### Description

Unix timestamp of the date of past or upcoming end of support cycles.
If not provided will include all announced end of support cycles. Defaults to `0`.

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:154](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L154)

***

### date\_sessions\_started?

```ts
optional date_sessions_started: number;
```

#### Description

Unix timestamp of a date to start looking for user sessions.
If not provided will start six months ago.

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:159](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L159)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)
