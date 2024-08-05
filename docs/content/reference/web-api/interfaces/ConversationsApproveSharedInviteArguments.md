# Interface: ConversationsApproveSharedInviteArguments

## Extends

- `InviteID`.`TargetTeam`.`TokenOverridable`

## Properties

### invite\_id

```ts
invite_id: string;
```

#### Description

ID of the invite.

#### Inherited from

`InviteID.invite_id`

#### Defined in

[packages/web-api/src/types/request/conversations.ts:31](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/conversations.ts#L31)

***

### target\_team?

```ts
optional target_team: string;
```

#### Description

The team or enterprise id of the other party.

#### Inherited from

`TargetTeam.target_team`

#### Defined in

[packages/web-api/src/types/request/common.ts:69](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L69)

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
