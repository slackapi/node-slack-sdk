[@slack/web-api](../index.md) / ConversationsApproveSharedInviteArguments

# Interface: ConversationsApproveSharedInviteArguments

Defined in: [src/types/request/conversations.ts:66](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L66)

## Extends

- `InviteID`.`TargetTeam`.`TokenOverridable`

## Properties

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

### target\_team?

```ts
optional target_team: string;
```

Defined in: [src/types/request/common.ts:74](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L74)

#### Description

The team or enterprise id of the other party.

#### Inherited from

```ts
TargetTeam.target_team
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
