[@slack/web-api](../index.md) / AdminFunctionsPermissionsLookupArguments

# Interface: AdminFunctionsPermissionsLookupArguments

Defined in: [src/types/request/admin/functions.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/functions.ts#L12)

## Extends

- `TokenOverridable`

## Properties

### function\_ids

```ts
function_ids: [string, ...string[]];
```

Defined in: [src/types/request/admin/functions.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/functions.ts#L14)

#### Description

An array of function IDs to get permissions for.

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
