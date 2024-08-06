# Interface: AdminConversationsInviteArguments

## Extends

- `ChannelID`.`UserIDs`.`TokenOverridable`

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

***

### user\_ids

```ts
user_ids: [string, ...string[]];
```

#### Description

List of encoded user IDs.

#### Inherited from

`UserIDs.user_ids`

#### Defined in

[packages/web-api/src/types/request/common.ts:83](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L83)
