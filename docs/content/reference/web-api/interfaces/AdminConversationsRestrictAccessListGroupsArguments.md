# Interface: AdminConversationsRestrictAccessListGroupsArguments

## Extends

- `ChannelID`.`RestrictAccessTeamID`.`TokenOverridable`

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

[packages/web-api/src/types/request/admin/conversations.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L13)

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

[packages/web-api/src/types/request/admin/conversations.ts:34](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L34)

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
