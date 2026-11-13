[@slack/web-api](../index.md) / AdminAppsMcpServersPermissionsSetArguments

# Interface: AdminAppsMcpServersPermissionsSetArguments

Defined in: [packages/web-api/src/types/request/admin/apps.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/apps.ts#L92)

## Extends

- `AppID`
- `TokenOverridable`

## Properties

### app\_id

```ts
app_id: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:101](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L101)

#### Description

The ID of the app.

#### Inherited from

`AppID.app_id`

***

### permission\_type

```ts
permission_type: "everyone" | "named_entities" | "named_entities_exclude" | "no_one";
```

Defined in: [packages/web-api/src/types/request/admin/apps.ts:96](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/apps.ts#L96)

#### Description

The type of permission that defines who can use this MCP server.

***

### server\_id

```ts
server_id: string;
```

Defined in: [packages/web-api/src/types/request/admin/apps.ts:94](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/apps.ts#L94)

#### Description

Encoded ID of the MCP server.

***

### token?

```ts
token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`

***

### user\_ids?

```ts
user_ids?: string[];
```

Defined in: [packages/web-api/src/types/request/admin/apps.ts:98](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/apps.ts#L98)

#### Description

List of user IDs to set for named_entities or named_entities_exclude.

***

### usergroup\_ids?

```ts
usergroup_ids?: string[];
```

Defined in: [packages/web-api/src/types/request/admin/apps.ts:100](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/apps.ts#L100)

#### Description

List of encoded usergroup IDs.
