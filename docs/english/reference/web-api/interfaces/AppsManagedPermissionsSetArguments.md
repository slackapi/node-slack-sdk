[@slack/web-api](../index.md) / AppsManagedPermissionsSetArguments

# Interface: AppsManagedPermissionsSetArguments

Defined in: [packages/web-api/src/types/request/apps.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L25)

## Extends

- `AppID`
- `TokenOverridable`

## Properties

### app\_id

```ts
app_id: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:101](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L101)

#### Description

The ID of the app.

#### Inherited from

`AppID.app_id`

***

### permissions

```ts
permissions: "everyone" | "app_owner";
```

Defined in: [packages/web-api/src/types/request/apps.ts:30](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L30)

#### Description

Who can interact with the app. Use `everyone` to allow all members, or `app_owner` to restrict access
to the app's owner.

***

### token?

```ts
token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`
