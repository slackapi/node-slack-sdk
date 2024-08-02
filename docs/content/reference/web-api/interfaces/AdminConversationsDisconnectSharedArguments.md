# Interface: AdminConversationsDisconnectSharedArguments

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

### leaving\_team\_ids?

```ts
optional leaving_team_ids: string[];
```

#### Description

Team IDs getting removed from the channel, optional if there are only two teams in the channel.

#### Defined in

[packages/web-api/src/types/request/admin/conversations.ts:96](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/conversations.ts#L96)

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
