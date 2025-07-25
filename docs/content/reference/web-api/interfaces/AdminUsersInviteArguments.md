[@slack/web-api](../index.md) / AdminUsersInviteArguments

# Interface: AdminUsersInviteArguments

Defined in: [src/types/request/admin/users.ts:63](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L63)

## Extends

- `ChannelIDs`.`TeamID`.`IsRestricted`.`IsUltraRestricted`.`TokenOverridable`

## Properties

### channel\_ids

```ts
channel_ids: [string, ...string[]];
```

Defined in: [src/types/request/common.ts:81](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L81)

#### Description

An array of channel IDs (must include at least one ID).

#### Inherited from

```ts
ChannelIDs.channel_ids
```

***

### custom\_message?

```ts
optional custom_message: string;
```

Defined in: [src/types/request/admin/users.ts:72](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L72)

#### Description

An optional message to send to the user in the invite email.

***

### email

```ts
email: string;
```

Defined in: [src/types/request/admin/users.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L70)

#### Description

The email address of the person to invite.

***

### email\_password\_policy\_enabled?

```ts
optional email_password_policy_enabled: boolean;
```

Defined in: [src/types/request/admin/users.ts:77](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L77)

#### Description

Allow invited user to sign in via email and password. Only available for Enterprise Grid teams via
admin invite.

***

### guest\_expiration\_ts?

```ts
optional guest_expiration_ts: string;
```

Defined in: [src/types/request/admin/users.ts:82](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L82)

#### Description

Timestamp when guest account should be disabled. Only include this timestamp if you are inviting a
guest user and you want their account to expire on a certain date.

***

### is\_restricted?

```ts
optional is_restricted: boolean;
```

Defined in: [src/types/request/admin/users.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L15)

#### Description

Set to `true` if user should be added to the workspace as a guest.

#### Inherited from

```ts
IsRestricted.is_restricted
```

***

### is\_ultra\_restricted?

```ts
optional is_ultra_restricted: boolean;
```

Defined in: [src/types/request/admin/users.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L20)

#### Description

Set to `true` if user should be added to the workspace as a guest.

#### Inherited from

```ts
IsUltraRestricted.is_ultra_restricted
```

***

### real\_name?

```ts
optional real_name: string;
```

Defined in: [src/types/request/admin/users.ts:84](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L84)

#### Description

Full name of the user.

***

### resend?

```ts
optional resend: boolean;
```

Defined in: [src/types/request/admin/users.ts:89](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L89)

#### Description

Allow this invite to be resent in the future if a user has not signed up yet.
Resending can only be done via the UI and has no expiration. Defaults to `false`.

***

### team\_id

```ts
team_id: string;
```

Defined in: [src/types/request/common.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L61)

#### Description

The encoded team ID.

#### Inherited from

```ts
TeamID.team_id
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
