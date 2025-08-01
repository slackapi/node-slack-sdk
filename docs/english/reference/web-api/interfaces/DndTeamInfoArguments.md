[@slack/web-api](../index.md) / DndTeamInfoArguments

# Interface: DndTeamInfoArguments

Defined in: [src/types/request/dnd.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/dnd.ts#L22)

## Extends

- `TokenOverridable`.`OptionalTeamAssignable`

## Properties

### team\_id?

```ts
optional team_id: string;
```

Defined in: [src/types/request/common.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L70)

#### Description

If using an org token, `team_id` is required.

#### Inherited from

```ts
OptionalTeamAssignable.team_id
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

***

### users

```ts
users: string;
```

Defined in: [src/types/request/dnd.ts:24](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/dnd.ts#L24)

#### Description

Comma-separated list of users to fetch Do Not Disturb status for.
