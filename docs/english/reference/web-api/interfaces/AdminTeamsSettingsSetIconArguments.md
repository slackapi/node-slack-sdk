[@slack/web-api](../index.md) / AdminTeamsSettingsSetIconArguments

# Interface: AdminTeamsSettingsSetIconArguments

Defined in: [src/types/request/admin/teams.ts:47](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L47)

## Extends

- `TeamID`.`TokenOverridable`

## Properties

### image\_url

```ts
image_url: string;
```

Defined in: [src/types/request/admin/teams.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L49)

#### Description

Image URL for the icon.

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
