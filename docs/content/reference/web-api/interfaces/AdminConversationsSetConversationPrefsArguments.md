# Interface: AdminConversationsSetConversationPrefsArguments

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

[packages/web-api/src/types/request/admin/conversations.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L13)

***

### prefs

```ts
prefs: Record<string, unknown>;
```

#### Description

The prefs for this channel.

#### Defined in

[packages/web-api/src/types/request/admin/conversations.ts:185](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L185)

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
