[@slack/web-api](../index.md) / AdminUsersAssignArguments

# Interface: AdminUsersAssignArguments

Defined in: [src/types/request/admin/users.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L54)

## Extends

- `TeamID`.`UserID`.`Partial`\<`ChannelIDs`\>.`IsRestricted`.`IsUltraRestricted`.`TokenOverridable`

## Properties

### channel\_ids?

```ts
optional channel_ids: [string, ...string[]];
```

Defined in: [src/types/request/common.ts:81](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L81)

#### Description

An array of channel IDs (must include at least one ID).

#### Inherited from

```ts
Partial.channel_ids
```

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

***

### user\_id

```ts
user_id: string;
```

Defined in: [src/types/request/common.ts:96](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L96)

#### Description

Encoded user ID.

#### Inherited from

```ts
UserID.user_id
```
