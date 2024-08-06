# Interface: AdminInviteRequestsApproveArguments

## Extends

- `InviteRequestID`.`Required`\<`OptionalTeamAssignable`\>.`TokenOverridable`

## Properties

### invite\_request\_id

```ts
invite_request_id: string;
```

#### Description

ID of the request to invite.

#### Inherited from

`InviteRequestID.invite_request_id`

#### Defined in

[packages/web-api/src/types/request/admin/inviteRequests.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/inviteRequests.ts#L5)

***

### team\_id

```ts
team_id: string;
```

#### Description

If using an org token, `team_id` is required.

#### Inherited from

`Required.team_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L65)

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
