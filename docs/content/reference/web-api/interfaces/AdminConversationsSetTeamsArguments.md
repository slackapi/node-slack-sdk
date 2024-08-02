# Interface: AdminConversationsSetTeamsArguments

## Extends

- `ChannelID`.`TokenOverridable`

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

### org\_channel?

```ts
optional org_channel: boolean;
```

#### Description

Set to `true` if channel has to be converted to an org channel. Defaults to `false`.

#### Defined in

[packages/web-api/src/types/request/admin/conversations.ts:197](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/conversations.ts#L197)

***

### target\_team\_ids?

```ts
optional target_team_ids: string[];
```

#### Description

A list of workspaces to which the channel should be shared.
Not required if the channel is being shared org-wide.

#### Defined in

[packages/web-api/src/types/request/admin/conversations.ts:202](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/conversations.ts#L202)

***

### team\_id?

```ts
optional team_id: string;
```

#### Description

The workspace to which the channel belongs.
Omit this argument if the channel is a cross-workspace shared channel.

#### Defined in

[packages/web-api/src/types/request/admin/conversations.ts:207](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/conversations.ts#L207)

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
