# Interface: AdminUsergroupsAddTeamsArguments

## Extends

- `UsergroupID`.`TokenOverridable`

## Properties

### auto\_provision?

```ts
optional auto_provision: boolean;
```

#### Description

When `true`, this method automatically creates new workspace accounts for the IDP group members.
Defaults to `false`.

#### Defined in

[packages/web-api/src/types/request/admin/usergroups.ts:28](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/usergroups.ts#L28)

***

### team\_ids

```ts
team_ids: string | string[];
```

#### Description

One or more encoded team (workspace) IDs.
Each workspace MUST belong to the organization associated with the token.

#### Defined in

[packages/web-api/src/types/request/admin/usergroups.ts:23](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/usergroups.ts#L23)

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

### usergroup\_id

```ts
usergroup_id: string;
```

#### Description

ID of the IDP group to list/manage channels for.

#### Inherited from

`UsergroupID.usergroup_id`

#### Defined in

[packages/web-api/src/types/request/admin/usergroups.ts:10](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/usergroups.ts#L10)
