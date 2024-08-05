# Interface: AdminTeamsSettingsSetDescriptionArguments

## Extends

- `TeamID`.`TokenOverridable`

## Properties

### description

```ts
description: string;
```

#### Description

The new description for the workspace.

#### Defined in

[packages/web-api/src/types/request/admin/teams.ts:37](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/teams.ts#L37)

***

### team\_id

```ts
team_id: string;
```

#### Description

The encoded team ID.

#### Inherited from

`TeamID.team_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:61](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L61)

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
