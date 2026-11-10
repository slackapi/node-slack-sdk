[@slack/web-api](../index.md) / AdminConversationsConvertToPrivateArguments

# Interface: AdminConversationsConvertToPrivateArguments

Defined in: [packages/web-api/src/types/request/admin/conversations.ts:57](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L57)

## Extends

- `ChannelID`
- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:85](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L85)

#### Description

Encoded channel ID.

#### Inherited from

`ChannelID.channel_id`

***

### name?

```ts
name?: string;
```

Defined in: [packages/web-api/src/types/request/admin/conversations.ts:59](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/conversations.ts#L59)

#### Description

Name of private channel to create. Only respected when converting an MPIM.

***

### token?

```ts
token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`
