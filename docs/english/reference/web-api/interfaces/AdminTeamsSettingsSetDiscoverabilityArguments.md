[@slack/web-api](../index.md) / AdminTeamsSettingsSetDiscoverabilityArguments

# Interface: AdminTeamsSettingsSetDiscoverabilityArguments

Defined in: [src/types/request/admin/teams.ts:41](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L41)

## Extends

- `TeamID`.`TokenOverridable`

## Properties

### discoverability

```ts
discoverability: TeamDiscoverability;
```

Defined in: [src/types/request/admin/teams.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L43)

#### Description

This workspace's discovery setting.

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
