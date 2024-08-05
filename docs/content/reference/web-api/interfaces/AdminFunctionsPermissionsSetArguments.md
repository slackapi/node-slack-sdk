# Interface: AdminFunctionsPermissionsSetArguments

## Extends

- `TokenOverridable`

## Properties

### function\_id

```ts
function_id: string;
```

#### Description

The function ID to set permissions for.

#### Defined in

[packages/web-api/src/types/request/admin/functions.ts:21](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/functions.ts#L21)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L43)

***

### user\_ids?

```ts
optional user_ids: string[];
```

#### Description

List of user IDs to allow for `named_entities` visibility.

#### Defined in

[packages/web-api/src/types/request/admin/functions.ts:25](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/functions.ts#L25)

***

### visibility

```ts
visibility: "everyone" | "app_collaborators" | "named_entities" | "no_one";
```

#### Description

The function visibility.

#### Defined in

[packages/web-api/src/types/request/admin/functions.ts:23](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/admin/functions.ts#L23)
