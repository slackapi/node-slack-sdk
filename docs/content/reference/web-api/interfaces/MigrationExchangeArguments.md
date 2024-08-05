# Interface: MigrationExchangeArguments

## Extends

- `TokenOverridable`.`OptionalTeamAssignable`

## Properties

### team\_id?

```ts
optional team_id: string;
```

#### Description

If using an org token, `team_id` is required.

#### Inherited from

`OptionalTeamAssignable.team_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:65](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L65)

***

### to\_old?

```ts
optional to_old: boolean;
```

#### Description

Specify `true` to convert `W` global user IDs to workspace-specific `U` IDs. Defaults to `false`.

#### Defined in

[packages/web-api/src/types/request/migration.ts:8](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/migration.ts#L8)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L43)

***

### users

```ts
users: string;
```

#### Description

A comma-separated list of user IDs, up to 400 per request.

#### Defined in

[packages/web-api/src/types/request/migration.ts:6](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/migration.ts#L6)
