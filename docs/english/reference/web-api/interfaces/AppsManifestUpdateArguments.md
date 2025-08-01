[@slack/web-api](../index.md) / AppsManifestUpdateArguments

# Interface: AppsManifestUpdateArguments

Defined in: [src/types/request/apps.ts:26](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L26)

## Extends

- `AppID`.`TokenOverridable`

## Properties

### app\_id

```ts
app_id: string;
```

Defined in: [src/types/request/common.ts:101](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L101)

#### Description

The ID of the app.

#### Inherited from

```ts
AppID.app_id
```

***

### manifest

```ts
manifest: Manifest;
```

Defined in: [src/types/request/apps.ts:27](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L27)

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
