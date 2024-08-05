# Interface: AdminConversationsBulkMoveArguments

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

[packages/web-api/src/types/request/common.ts:76](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L76)

***

### target\_team\_id

```ts
target_team_id: string;
```

#### Description

Target team ID to move channels to.

#### Defined in

[packages/web-api/src/types/request/admin/conversations.ts:49](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/conversations.ts#L49)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L43)
