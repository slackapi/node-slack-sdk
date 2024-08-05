# Interface: AdminTeamsSettingsSetDefaultChannelsArguments

## Extends

- `ChannelIDs`.`TeamID`.`TokenOverridable`

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

### team\_id

```ts
team_id: string;
```

#### Description

The encoded team ID.

#### Inherited from

`TeamID.team_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:61](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L61)

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
