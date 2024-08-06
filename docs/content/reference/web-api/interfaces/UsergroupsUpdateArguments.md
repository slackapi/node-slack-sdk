# Interface: UsergroupsUpdateArguments

## Extends

- `TokenOverridable`.`OptionalTeamAssignable`.`Partial`\<[`UsergroupsCreateArguments`](UsergroupsCreateArguments.md)\>

## Properties

### channels?

```ts
optional channels: string;
```

#### Description

A comma separated string of encoded channel IDs for which the User Group uses as a default.

#### Inherited from

`Partial.channels`

#### Defined in

[packages/web-api/src/types/request/usergroups.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/usergroups.ts#L14)

***

### description?

```ts
optional description: string;
```

#### Description

A short description of the User Group.

#### Inherited from

`Partial.description`

#### Defined in

[packages/web-api/src/types/request/usergroups.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/usergroups.ts#L16)

***

### handle?

```ts
optional handle: string;
```

#### Description

A mention handle. Must be unique among channels, users and User Groups.

#### Inherited from

`Partial.handle`

#### Defined in

[packages/web-api/src/types/request/usergroups.ts:18](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/usergroups.ts#L18)

***

### include\_count?

```ts
optional include_count: boolean;
```

#### Description

Include the number of users in each User Group.

#### Inherited from

`Partial.include_count`

#### Defined in

[packages/web-api/src/types/request/usergroups.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/usergroups.ts#L6)

***

### name?

```ts
optional name: string;
```

#### Description

A name for the User Group. Must be unique among User Groups.

#### Inherited from

`Partial.name`

#### Defined in

[packages/web-api/src/types/request/usergroups.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/usergroups.ts#L12)

***

### team\_id?

```ts
optional team_id: string;
```

#### Description

If using an org token, `team_id` is required.

#### Inherited from

`OptionalTeamAssignable.team_id`

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

***

### usergroup

```ts
usergroup: string;
```

#### Description

The encoded ID of the User Group to update.

#### Defined in

[packages/web-api/src/types/request/usergroups.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/usergroups.ts#L43)
