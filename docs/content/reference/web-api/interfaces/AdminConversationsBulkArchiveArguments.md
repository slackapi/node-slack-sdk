# Interface: AdminConversationsBulkArchiveArguments

## Extends

- `ChannelIDs`.`TokenOverridable`

## Properties

### channel\_ids

```ts
channel_ids: [string, ...string[]];
```

#### Description

An array of channel IDs (must include at least one ID).

#### Inherited from

`ChannelIDs.channel_ids`

#### Defined in

[packages/web-api/src/types/request/common.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L76)

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
