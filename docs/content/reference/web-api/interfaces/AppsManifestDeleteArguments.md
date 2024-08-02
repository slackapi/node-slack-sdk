# Interface: AppsManifestDeleteArguments

## Extends

- `AppID`.`TokenOverridable`

## Properties

### app\_id

```ts
app_id: string;
```

#### Description

The ID of the app.

#### Inherited from

`AppID.app_id`

#### Defined in

[packages/web-api/src/types/request/common.ts:88](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L88)

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
