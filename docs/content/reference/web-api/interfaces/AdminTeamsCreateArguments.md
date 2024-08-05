# Interface: AdminTeamsCreateArguments

## Extends

- `TokenOverridable`

## Properties

### team\_description?

```ts
optional team_description: string;
```

#### Description

Description for the team.

#### Defined in

[packages/web-api/src/types/request/admin/teams.ts:17](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/teams.ts#L17)

***

### team\_discoverability?

```ts
optional team_discoverability: TeamDiscoverability;
```

#### Description

Who can join the team.

#### Defined in

[packages/web-api/src/types/request/admin/teams.ts:19](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/teams.ts#L19)

***

### team\_domain

```ts
team_domain: string;
```

#### Description

Team domain (for example, slacksoftballteam). Domains are limited to 21 characters.

#### Defined in

[packages/web-api/src/types/request/admin/teams.ts:13](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/teams.ts#L13)

***

### team\_name

```ts
team_name: string;
```

#### Description

Team name (for example, Slack Softball Team).

#### Defined in

[packages/web-api/src/types/request/admin/teams.ts:15](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/teams.ts#L15)

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
