[@slack/web-api](../index.md) / AdminConversationsBulkArchiveArguments

# Interface: AdminConversationsBulkArchiveArguments

Defined in: [src/types/request/admin/conversations.ts:45](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L45)

## Extends

- `ChannelIDs`.`TokenOverridable`

## Properties

### channel\_ids

```ts
channel_ids: [string, ...string[]];
```

Defined in: [src/types/request/common.ts:81](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L81)

#### Description

An array of channel IDs (must include at least one ID).

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
