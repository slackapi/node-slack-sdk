[@slack/web-api](../index.md) / AdminConversationsSetTeamsArguments

# Interface: AdminConversationsSetTeamsArguments

Defined in: [src/types/request/admin/conversations.ts:208](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L208)

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

### org\_channel?

```ts
optional org_channel: boolean;
```

Defined in: [src/types/request/admin/conversations.ts:210](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L210)

#### Description

Set to `true` if channel has to be converted to an org channel. Defaults to `false`.

***

### target\_team\_ids?

```ts
optional target_team_ids: string[];
```

Defined in: [src/types/request/admin/conversations.ts:215](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L215)

#### Description

A list of workspaces to which the channel should be shared.
Not required if the channel is being shared org-wide.

***

### team\_id?

```ts
optional team_id: string;
```

Defined in: [src/types/request/admin/conversations.ts:220](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L220)

#### Description

The workspace to which the channel belongs.
Omit this argument if the channel is a cross-workspace shared channel.

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
