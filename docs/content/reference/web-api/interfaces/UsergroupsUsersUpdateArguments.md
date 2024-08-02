# Interface: UsergroupsUsersUpdateArguments

## Extends

- `TokenOverridable`.`OptionalTeamAssignable`.`UsergroupsIncludeCount`

## Properties

### include\_count?

```ts
optional include_count: boolean;
```

#### Description

Include the number of users in each User Group.

#### Inherited from

`UsergroupsIncludeCount.include_count`

#### Defined in

[packages/web-api/src/types/request/usergroups.ts:6](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/usergroups.ts#L6)

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

The encoded ID of the User Group to update users for.

#### Defined in

[packages/web-api/src/types/request/usergroups.ts:56](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/usergroups.ts#L56)

***

### users

```ts
users: string;
```

#### Description

A comma separated string of encoded user IDs that represent the entire list of users for
the User Group.

#### Defined in

[packages/web-api/src/types/request/usergroups.ts:61](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/usergroups.ts#L61)
