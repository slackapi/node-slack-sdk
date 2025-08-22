[@slack/web-api](../index.md) / ConversationsRequestSharedInviteApproveArguments

# Interface: ConversationsRequestSharedInviteApproveArguments

Defined in: [src/types/request/conversations.ts:195](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L195)

## Extends

- `InviteID`.`Partial`\<`ChannelID`\>.`TokenOverridable`

## Properties

### channel\_id?

```ts
optional channel_id: string;
```

Defined in: [src/types/request/common.ts:85](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L85)

#### Description

Encoded channel ID.

#### Inherited from

[`AdminConversationsArchiveArguments`](AdminConversationsArchiveArguments.md).[`channel_id`](AdminConversationsArchiveArguments.md#channel_id)

***

### invite\_id

```ts
invite_id: string;
```

Defined in: [src/types/request/conversations.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L28)

#### Description

ID of the invite.

#### Inherited from

```ts
InviteID.invite_id
```

***

### is\_external\_limited?

```ts
optional is_external_limited: boolean;
```

Defined in: [src/types/request/conversations.ts:203](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L203)

#### Description

Whether the invited team will have post-only permissions in the channel.
Will override the value on the requested invite.

***

### message?

```ts
optional message: object;
```

Defined in: [src/types/request/conversations.ts:205](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L205)

#### is\_override

```ts
is_override: boolean;
```

##### Description

When `true`, will override the user specified message. Otherwise, `text` will be appended to the
user specified message on the invite request.

#### text

```ts
text: string;
```

##### Description

Text to include along with the email invite.

#### Description

Optional additional messaging to attach to the invite approval message.

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
