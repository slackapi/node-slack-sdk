[@slack/web-api](../index.md) / AdminUsergroupsListChannelsArguments

# Interface: AdminUsergroupsListChannelsArguments

Defined in: [src/types/request/admin/usergroups.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/usergroups.ts#L35)

## Extends

- `UsergroupID`.`OptionalTeamAssignable`.`TokenOverridable`

## Properties

### include\_num\_members?

```ts
optional include_num_members: boolean;
```

Defined in: [src/types/request/admin/usergroups.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/usergroups.ts#L37)

#### Description

Flag to include or exclude the count of members per channel.

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
