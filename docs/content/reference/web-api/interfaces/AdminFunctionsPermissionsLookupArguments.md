# Interface: AdminFunctionsPermissionsLookupArguments

## Extends

- `TokenOverridable`

## Properties

### function\_ids

```ts
function_ids: [string, ...string[]];
```

#### Description

An array of function IDs to get permissions for.

#### Defined in

[packages/web-api/src/types/request/admin/functions.ts:15](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/functions.ts#L15)

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
