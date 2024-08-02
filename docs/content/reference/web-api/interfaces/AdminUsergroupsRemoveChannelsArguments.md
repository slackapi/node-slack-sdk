# Interface: AdminUsergroupsRemoveChannelsArguments

## Extends

- `ChannelIDs`.`UsergroupID`.`TokenOverridable`

## Properties

### channel\_ids

```ts
channel_ids: string | string[];
```

#### Description

One or more encoded channel IDs.

#### Inherited from

`ChannelIDs.channel_ids`

#### Defined in

[packages/web-api/src/types/request/admin/usergroups.ts:5](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/usergroups.ts#L5)

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
