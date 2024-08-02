# Interface: AdminAppsConfigLookupArguments

## Extends

- `TokenOverridable`

## Properties

### app\_ids

```ts
app_ids: string[];
```

#### Description

An array of app IDs to get app configs for.

#### Defined in

[packages/web-api/src/types/request/admin/apps.ts:67](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/apps.ts#L67)

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
