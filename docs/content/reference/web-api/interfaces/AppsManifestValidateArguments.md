# Interface: AppsManifestValidateArguments

## Extends

- `Partial`\<`AppID`\>.`TokenOverridable`

## Properties

### app\_id?

```ts
optional app_id: string;
```

#### Description

The ID of the app.

#### Inherited from

`Partial.app_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:88](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L88)

***

### manifest

```ts
manifest: Manifest;
```

#### Defined in

[packages/web-api/src/types/request/apps.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L33)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)
