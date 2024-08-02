# Interface: AdminConversationsRestrictAccessAddGroupArguments

## Extends

- `ChannelID`.`GroupID`.`RestrictAccessTeamID`.`TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

#### Description

Encoded channel ID.

#### Inherited from

`ChannelID.channel_id`

#### Defined in

[packages/web-api/src/types/request/admin/conversations.ts:13](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/conversations.ts#L13)

***

### group\_id

```ts
group_id: string;
```

#### Description

The [IDP Group](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org) ID.

#### Inherited from

`GroupID.group_id`

#### Defined in

[packages/web-api/src/types/request/admin/conversations.ts:20](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/conversations.ts#L20)

***

### team\_id?

```ts
optional team_id: string;
```

#### Description

The workspace where the channel exists. This argument is required for channels only tied to
one workspace, and optional for channels that are shared across an organization.

#### Inherited from

`RestrictAccessTeamID.team_id`

#### Defined in

[packages/web-api/src/types/request/admin/conversations.ts:34](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/conversations.ts#L34)

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
