[@slack/web-api](../index.md) / AdminConversationsInviteArguments

# Interface: AdminConversationsInviteArguments

Defined in: [src/types/request/admin/conversations.ts:119](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L119)

## Extends

- `ChannelID`.`UserIDs`.`TokenOverridable`

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

***

### user\_ids

```ts
user_ids: [string, ...string[]];
```

Defined in: [src/types/request/common.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L92)

#### Description

List of encoded user IDs.

#### Inherited from

```ts
UserIDs.user_ids
```
