[@slack/web-api](../index.md) / AdminInviteRequestsDenyArguments

# Interface: AdminInviteRequestsDenyArguments

Defined in: [src/types/request/admin/inviteRequests.ts:27](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/inviteRequests.ts#L27)

## Extends

- `InviteRequestID`.`Required`\<`OptionalTeamAssignable`\>.`TokenOverridable`

## Properties

### invite\_request\_id

```ts
invite_request_id: string;
```

Defined in: [src/types/request/admin/inviteRequests.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/inviteRequests.ts#L5)

#### Description

ID of the request to invite.

#### Inherited from

```ts
InviteRequestID.invite_request_id
```

***

### team\_id

```ts
team_id: string;
```

Defined in: [src/types/request/common.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L70)

#### Description

If using an org token, `team_id` is required.

#### Inherited from

```ts
Required.team_id
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
