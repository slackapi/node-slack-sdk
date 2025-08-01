[@slack/web-api](../index.md) / AdminUsergroupsAddTeamsArguments

# Interface: AdminUsergroupsAddTeamsArguments

Defined in: [src/types/request/admin/usergroups.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/usergroups.ts#L21)

## Extends

- `UsergroupID`.`TokenOverridable`

## Properties

### auto\_provision?

```ts
optional auto_provision: boolean;
```

Defined in: [src/types/request/admin/usergroups.ts:31](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/usergroups.ts#L31)

#### Description

When `true`, this method automatically creates new workspace accounts for the IDP group members.
Defaults to `false`.

***

### team\_ids

```ts
team_ids: string | string[];
```

Defined in: [src/types/request/admin/usergroups.ts:26](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/usergroups.ts#L26)

#### Description

One or more encoded team (workspace) IDs.
Each workspace MUST belong to the organization associated with the token.

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

### usergroup\_id

```ts
usergroup_id: string;
```

Defined in: [src/types/request/admin/usergroups.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/usergroups.ts#L10)

#### Description

ID of the IDP group to list/manage channels for.

#### Inherited from

```ts
UsergroupID.usergroup_id
```
