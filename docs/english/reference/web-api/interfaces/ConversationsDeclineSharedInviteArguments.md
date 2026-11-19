[@slack/web-api](../index.md) / ConversationsDeclineSharedInviteArguments

# Interface: ConversationsDeclineSharedInviteArguments

Defined in: [packages/web-api/src/types/request/conversations.ts:81](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L81)

## Extends

- `InviteID`
- `TargetTeam`
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

### target\_team?

```ts
target_team?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:74](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L74)

#### Description

The team or enterprise id of the other party.

#### Inherited from

`TargetTeam.target_team`

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
