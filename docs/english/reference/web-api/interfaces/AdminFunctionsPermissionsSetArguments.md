[@slack/web-api](../index.md) / AdminFunctionsPermissionsSetArguments

# Interface: AdminFunctionsPermissionsSetArguments

Defined in: [src/types/request/admin/functions.ts:18](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/functions.ts#L18)

## Extends

- `TokenOverridable`.`Partial`\<`UserIDs`\>

## Properties

### function\_id

```ts
function_id: string;
```

Defined in: [src/types/request/admin/functions.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/functions.ts#L20)

#### Description

The function ID to set permissions for.

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

### user\_ids?

```ts
optional user_ids: [string, ...string[]];
```

Defined in: [src/types/request/common.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L92)

#### Description

List of encoded user IDs.

#### Inherited from

[`AdminConversationsInviteArguments`](AdminConversationsInviteArguments.md).[`user_ids`](AdminConversationsInviteArguments.md#user_ids)

***

### visibility

```ts
visibility: "everyone" | "app_collaborators" | "named_entities" | "no_one";
```

Defined in: [src/types/request/admin/functions.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/functions.ts#L22)

#### Description

The function visibility.
