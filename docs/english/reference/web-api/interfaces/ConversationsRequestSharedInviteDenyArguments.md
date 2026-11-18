[@slack/web-api](../index.md) / ConversationsRequestSharedInviteDenyArguments

# Interface: ConversationsRequestSharedInviteDenyArguments

Defined in: [packages/web-api/src/types/request/conversations.ts:217](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L217)

## Extends

- `InviteID`
- `Message`
- `TokenOverridable`

## Properties

### invite\_id

```ts
invite_id: string;
```

Defined in: [packages/web-api/src/types/request/conversations.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L28)

#### Description

ID of the invite.

#### Inherited from

`InviteID.invite_id`

***

### message?

```ts
message?: string;
```

Defined in: [packages/web-api/src/types/request/conversations.ts:40](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L40)

#### Description

A message to send to the user who requested the invite.

#### Inherited from

`Message.message`

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
