[@slack/web-api](../index.md) / AdminTeamsCreateArguments

# Interface: AdminTeamsCreateArguments

Defined in: [src/types/request/admin/teams.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L11)

## Extends

- `TokenOverridable`

## Properties

### team\_description?

```ts
optional team_description: string;
```

Defined in: [src/types/request/admin/teams.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L17)

#### Description

Description for the team.

***

### team\_discoverability?

```ts
optional team_discoverability: TeamDiscoverability;
```

Defined in: [src/types/request/admin/teams.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L19)

#### Description

Who can join the team.

***

### team\_domain

```ts
team_domain: string;
```

Defined in: [src/types/request/admin/teams.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L13)

#### Description

Team domain (for example, slacksoftballteam). Domains are limited to 21 characters.

***

### team\_name

```ts
team_name: string;
```

Defined in: [src/types/request/admin/teams.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L15)

#### Description

Team name (for example, Slack Softball Team).

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
