[@slack/web-api](../index.md) / MigrationExchangeArguments

# Interface: MigrationExchangeArguments

Defined in: [src/types/request/migration.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/migration.ts#L4)

## Extends

- `TokenOverridable`.`OptionalTeamAssignable`

## Properties

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

### to\_old?

```ts
optional to_old: boolean;
```

Defined in: [src/types/request/migration.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/migration.ts#L8)

#### Description

Specify `true` to convert `W` global user IDs to workspace-specific `U` IDs. Defaults to `false`.

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

### users

```ts
users: string;
```

Defined in: [src/types/request/migration.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/migration.ts#L6)

#### Description

A comma-separated list of user IDs, up to 400 per request.
