[@slack/web-api](../index.md) / UsergroupsDisableArguments

# Interface: UsergroupsDisableArguments

Defined in: [src/types/request/usergroups.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/usergroups.ts#L21)

## Extends

- `TokenOverridable`.`OptionalTeamAssignable`.`UsergroupsIncludeCount`

## Properties

### include\_count?

```ts
optional include_count: boolean;
```

Defined in: [src/types/request/usergroups.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/usergroups.ts#L6)

#### Description

Include the number of users in each User Group.

#### Inherited from

```ts
UsergroupsIncludeCount.include_count
```

***

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

### usergroup

```ts
usergroup: string;
```

Defined in: [src/types/request/usergroups.ts:23](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/usergroups.ts#L23)

#### Description

The encoded ID of the User Group to disable.
