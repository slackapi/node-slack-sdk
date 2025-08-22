[@slack/web-api](../index.md) / AppsManifestValidateArguments

# Interface: AppsManifestValidateArguments

Defined in: [src/types/request/apps.ts:31](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L31)

## Extends

- `Partial`\<`AppID`\>.`TokenOverridable`

## Properties

### app\_id?

```ts
optional app_id: string;
```

Defined in: [src/types/request/common.ts:101](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L101)

#### Description

The ID of the app.

#### Inherited from

[`AdminAppsConfigSetArguments`](AdminAppsConfigSetArguments.md).[`app_id`](AdminAppsConfigSetArguments.md#app_id)

***

### manifest

```ts
manifest: Manifest;
```

Defined in: [src/types/request/apps.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L32)

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
