[@slack/web-api](../index.md) / AdminConversationsRestrictAccessListGroupsArguments

# Interface: AdminConversationsRestrictAccessListGroupsArguments

Defined in: [src/types/request/admin/conversations.ts:149](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L149)

## Extends

- `ChannelID`.`RestrictAccessTeamID`.`TokenOverridable`

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

### team\_id?

```ts
optional team_id: string;
```

Defined in: [src/types/request/admin/conversations.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L38)

#### Description

The workspace where the channel exists. This argument is required for channels only tied to
one workspace, and optional for channels that are shared across an organization.

#### Inherited from

```ts
RestrictAccessTeamID.team_id
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
