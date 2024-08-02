# Interface: UsergroupsUsersListArguments

## Extends

- `TokenOverridable`.`OptionalTeamAssignable`

## Properties

### include\_disabled?

```ts
optional include_disabled: boolean;
```

#### Description

Allow results that involve disabled User Groups.

#### Defined in

[packages/web-api/src/types/request/usergroups.ts:50](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/usergroups.ts#L50)

***

### team\_id?

```ts
optional team_id: string;
```

#### Description

If using an org token, `team_id` is required.

#### Inherited from

`OptionalTeamAssignable.team_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:65](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L65)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L43)

***

### usergroup

```ts
usergroup: string;
```

#### Description

The encoded ID of the User Group to list users for.

#### Defined in

[packages/web-api/src/types/request/usergroups.ts:48](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/usergroups.ts#L48)
