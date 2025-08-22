[@slack/web-api](../index.md) / UsergroupsUsersListArguments

# Interface: UsergroupsUsersListArguments

Defined in: [src/types/request/usergroups.ts:51](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/usergroups.ts#L51)

## Extends

- `TokenOverridable`.`OptionalTeamAssignable`

## Properties

### include\_disabled?

```ts
optional include_disabled: boolean;
```

Defined in: [src/types/request/usergroups.ts:55](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/usergroups.ts#L55)

#### Description

Allow results that involve disabled User Groups.

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

Defined in: [src/types/request/usergroups.ts:53](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/usergroups.ts#L53)

#### Description

The encoded ID of the User Group to list users for.
