[@slack/web-api](../index.md) / ConversationsExternalInvitePermissionsSetArguments

# Interface: ConversationsExternalInvitePermissionsSetArguments

Defined in: [src/types/request/conversations.ts:84](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L84)

## Extends

- `Channel`.`Required`\<`TargetTeam`\>.`TokenOverridable`

## Properties

### action

```ts
action: "downgrade" | "upgrade";
```

Defined in: [src/types/request/conversations.ts:89](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L89)

#### Description

The type of action be taken: `upgrade` or `downgrade`.

***

### channel

```ts
channel: string;
```

Defined in: [src/types/request/conversations.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L15)

#### Description

ID of conversation.

#### Inherited from

```ts
Channel.channel
```

***

### target\_team

```ts
target_team: string;
```

Defined in: [src/types/request/common.ts:74](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L74)

#### Description

The team or enterprise id of the other party.

#### Inherited from

[`ConversationsApproveSharedInviteArguments`](ConversationsApproveSharedInviteArguments.md).[`target_team`](ConversationsApproveSharedInviteArguments.md#target_team)

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
