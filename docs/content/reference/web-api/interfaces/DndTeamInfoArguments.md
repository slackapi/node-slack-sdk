# Interface: DndTeamInfoArguments

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

[packages/web-api/src/types/request/common.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L65)

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

***

### users

```ts
users: string;
```

#### Description

Comma-separated list of users to fetch Do Not Disturb status for.

#### Defined in

[packages/web-api/src/types/request/dnd.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/dnd.ts#L21)
