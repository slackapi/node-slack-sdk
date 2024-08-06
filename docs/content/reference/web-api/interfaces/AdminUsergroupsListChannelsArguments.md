# Interface: AdminUsergroupsListChannelsArguments

## Extends

- `UsergroupID`.`OptionalTeamAssignable`.`TokenOverridable`

## Properties

### include\_num\_members?

```ts
optional include_num_members: boolean;
```

#### Description

Flag to include or exclude the count of members per channel.

#### Defined in

[packages/web-api/src/types/request/admin/usergroups.ts:34](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/usergroups.ts#L34)

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

### usergroup\_id

```ts
usergroup_id: string;
```

#### Description

ID of the IDP group to list/manage channels for.

#### Inherited from

`UsergroupID.usergroup_id`

#### Defined in

[packages/web-api/src/types/request/admin/usergroups.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/usergroups.ts#L10)
