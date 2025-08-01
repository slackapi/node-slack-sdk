[@slack/web-api](../index.md) / AdminRolesRemoveAssignmentsArguments

# Interface: AdminRolesRemoveAssignmentsArguments

Defined in: [src/types/request/admin/roles.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/roles.ts#L39)

## Extends

- `EntityIDs`.`RoleID`.`UserIDs`.`TokenOverridable`

## Properties

### entity\_ids

```ts
entity_ids: [string, ...string[]];
```

Defined in: [src/types/request/admin/roles.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/roles.ts#L10)

#### Description

List of the entity IDs for which roles will be assigned/listed/removed.
These can be Org IDs (E12345), Team IDs (T12345) or Channel IDs (C12345).

#### Inherited from

```ts
EntityIDs.entity_ids
```

***

### role\_id

```ts
role_id: string;
```

Defined in: [src/types/request/admin/roles.ts:18](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/roles.ts#L18)

#### Description

ID of the role to which users will be assigned/removed.

#### See

[Admin Roles under Usage info](https://docs.slack.dev/reference/methods/admin.roles.addAssignments).

#### Inherited from

```ts
RoleID.role_id
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

### user\_ids

```ts
user_ids: [string, ...string[]];
```

Defined in: [src/types/request/common.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L92)

#### Description

List of encoded user IDs.

#### Inherited from

```ts
UserIDs.user_ids
```
