[@slack/web-api](../index.md) / AdminConversationsDisconnectSharedArguments

# Interface: AdminConversationsDisconnectSharedArguments

Defined in: [src/types/request/admin/conversations.ts:99](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L99)

## Extends

- `ChannelID`.`TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [src/types/request/common.ts:85](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L85)

#### Description

Encoded channel ID.

#### Inherited from

```ts
ChannelID.channel_id
```

***

### leaving\_team\_ids?

```ts
optional leaving_team_ids: string[];
```

Defined in: [src/types/request/admin/conversations.ts:101](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L101)

#### Description

Team IDs getting removed from the channel, optional if there are only two teams in the channel.

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
