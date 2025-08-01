[@slack/web-api](../index.md) / AdminTeamsSettingsSetDefaultChannelsArguments

# Interface: AdminTeamsSettingsSetDefaultChannelsArguments

Defined in: [src/types/request/admin/teams.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/teams.ts#L32)

## Extends

- `ChannelIDs`.`TeamID`.`TokenOverridable`

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

### team\_id

```ts
team_id: string;
```

Defined in: [src/types/request/common.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L61)

#### Description

The encoded team ID.

#### Inherited from

```ts
TeamID.team_id
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
