# Interface: AdminRolesRemoveAssignmentsArguments

## Extends

- `EntityIDs`.`RoleID`.`UserIDs`.`TokenOverridable`

## Properties

### entity\_ids

```ts
entity_ids: [string, ...string[]];
```

#### Description

List of the entity IDs for which roles will be assigned/listed/removed.
These can be Org IDs (E12345), Team IDs (T12345) or Channel IDs (C12345).

#### Inherited from

`EntityIDs.entity_ids`

#### Defined in

[packages/web-api/src/types/request/admin/roles.ts:10](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/roles.ts#L10)

***

### role\_id

```ts
role_id: string;
```

#### Description

ID of the role to which users will be assigned/removed.

#### See

[Admin Roles under Usage info](https://api.slack.com/methods/admin.roles.addAssignments#markdown).

#### Inherited from

`RoleID.role_id`

#### Defined in

[packages/web-api/src/types/request/admin/roles.ts:18](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/roles.ts#L18)

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

### user\_ids

```ts
user_ids: [string, ...string[]];
```

#### Description

List of encoded user IDs.

#### Inherited from

`UserIDs.user_ids`

#### Defined in

[packages/web-api/src/types/request/common.ts:83](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L83)
