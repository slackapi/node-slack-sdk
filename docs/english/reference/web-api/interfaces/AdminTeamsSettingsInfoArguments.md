[@slack/web-api](../index.md) / AdminTeamsSettingsInfoArguments

# Interface: AdminTeamsSettingsInfoArguments

Defined in: [src/types/request/admin/teams.ts:29](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L29)

## Extends

- `TeamID`.`TokenOverridable`

## Properties

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
