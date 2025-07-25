[@slack/web-api](../index.md) / AdminUsersUnsupportedVersionsExportArguments

# Interface: AdminUsersUnsupportedVersionsExportArguments

Defined in: [src/types/request/admin/users.ts:158](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L158)

## Extends

- `TokenOverridable`

## Properties

### date\_end\_of\_support?

```ts
optional date_end_of_support: number;
```

Defined in: [src/types/request/admin/users.ts:163](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L163)

#### Description

Unix timestamp of the date of past or upcoming end of support cycles.
If not provided will include all announced end of support cycles. Defaults to `0`.

***

### date\_sessions\_started?

```ts
optional date_sessions_started: number;
```

Defined in: [src/types/request/admin/users.ts:168](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L168)

#### Description

Unix timestamp of a date to start looking for user sessions.
If not provided will start six months ago.

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
