# Interface: AdminUsersInviteArguments

## Extends

- `ChannelIDs`.`TeamID`.`IsRestricted`.`IsUltraRestricted`.`TokenOverridable`

## Properties

### channel\_ids

```ts
channel_ids: [string, ...string[]];
```

#### Description

An array of channel IDs (must include at least one ID).

#### Inherited from

`ChannelIDs.channel_ids`

#### Defined in

[packages/web-api/src/types/request/common.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L76)

***

### custom\_message?

```ts
optional custom_message: string;
```

#### Description

An optional message to send to the user in the invite email.

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:67](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L67)

***

### email

```ts
email: string;
```

#### Description

The email address of the person to invite.

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:65](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L65)

***

### email\_password\_policy\_enabled?

```ts
optional email_password_policy_enabled: boolean;
```

#### Description

Allow invited user to sign in via email and password. Only available for Enterprise Grid teams via
admin invite.

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:72](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L72)

***

### guest\_expiration\_ts?

```ts
optional guest_expiration_ts: string;
```

#### Description

Timestamp when guest account should be disabled. Only include this timestamp if you are inviting a
guest user and you want their account to expire on a certain date.

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:77](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L77)

***

### is\_restricted?

```ts
optional is_restricted: boolean;
```

#### Description

Set to `true` if user should be added to the workspace as a guest.

#### Inherited from

`IsRestricted.is_restricted`

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L19)

***

### is\_ultra\_restricted?

```ts
optional is_ultra_restricted: boolean;
```

#### Description

Set to `true` if user should be added to the workspace as a guest.

#### Inherited from

`IsUltraRestricted.is_ultra_restricted`

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:24](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L24)

***

### real\_name?

```ts
optional real_name: string;
```

#### Description

Full name of the user.

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:79](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L79)

***

### resend?

```ts
optional resend: boolean;
```

#### Description

Allow this invite to be resent in the future if a user has not signed up yet.
Resending can only be done via the UI and has no expiration. Defaults to `false`.

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:84](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L84)

***

### team\_id

```ts
team_id: string;
```

#### Description

The encoded team ID.

#### Inherited from

`TeamID.team_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L61)

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
