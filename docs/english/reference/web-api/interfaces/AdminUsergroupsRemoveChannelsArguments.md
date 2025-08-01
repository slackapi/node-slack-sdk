[@slack/web-api](../index.md) / AdminUsergroupsRemoveChannelsArguments

# Interface: AdminUsergroupsRemoveChannelsArguments

Defined in: [src/types/request/admin/usergroups.ts:41](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/usergroups.ts#L41)

## Extends

- `ChannelIDs`.`UsergroupID`.`TokenOverridable`

## Properties

### channel\_ids

```ts
channel_ids: string | string[];
```

Defined in: [src/types/request/admin/usergroups.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/usergroups.ts#L5)

#### Description

One or more encoded channel IDs.

#### Inherited from

```ts
ChannelIDs.channel_ids
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
