[@slack/web-api](../index.md) / AdminTeamsSettingsSetDescriptionArguments

# Interface: AdminTeamsSettingsSetDescriptionArguments

Defined in: [src/types/request/admin/teams.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L35)

## Extends

- `TeamID`.`TokenOverridable`

## Properties

### description

```ts
description: string;
```

Defined in: [src/types/request/admin/teams.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L37)

#### Description

The new description for the workspace.

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
