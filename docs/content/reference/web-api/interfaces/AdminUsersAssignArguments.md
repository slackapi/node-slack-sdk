# Interface: AdminUsersAssignArguments

## Extends

- `TeamID`.`UserID`.`Partial`\<`ChannelIDs`\>.`IsRestricted`.`IsUltraRestricted`.`TokenOverridable`

## Properties

### channel\_ids?

```ts
optional channel_ids: [string, ...string[]];
```

#### Description

An array of channel IDs (must include at least one ID).

#### Inherited from

`Partial.channel_ids`

#### Defined in

[packages/web-api/src/types/request/common.ts:76](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L76)

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

[packages/web-api/src/types/request/admin/users.ts:19](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/users.ts#L19)

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

[packages/web-api/src/types/request/admin/users.ts:24](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/users.ts#L24)

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

[packages/web-api/src/types/request/common.ts:61](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L61)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L43)

***

### user\_id

```ts
user_id: string;
```

#### Description

The ID of the user.

#### Inherited from

`UserID.user_id`

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:14](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/users.ts#L14)
