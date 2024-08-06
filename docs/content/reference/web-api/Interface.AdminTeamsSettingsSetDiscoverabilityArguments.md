# Interface: AdminTeamsSettingsSetDiscoverabilityArguments

## Extends

- `TeamID`.`TokenOverridable`

## Properties

### discoverability

```ts
discoverability: TeamDiscoverability;
```

#### Description

This workspace's discovery setting.

#### Defined in

[packages/web-api/src/types/request/admin/teams.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L43)

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

[packages/web-api/src/types/request/common.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L61)

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
