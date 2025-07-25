[@slack/web-api](../index.md) / AdminAppsConfigLookupArguments

# Interface: AdminAppsConfigLookupArguments

Defined in: [src/types/request/admin/apps.ts:67](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/apps.ts#L67)

## Extends

- `TokenOverridable`

## Properties

### app\_ids

```ts
app_ids: string[];
```

Defined in: [src/types/request/admin/apps.ts:69](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/apps.ts#L69)

#### Description

An array of app IDs to get app configs for.

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
