[@slack/web-api](../index.md) / AdminAppsConfigSetArguments

# Interface: AdminAppsConfigSetArguments

Defined in: [src/types/request/admin/apps.ts:73](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/apps.ts#L73)

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

### domain\_restrictions?

```ts
optional domain_restrictions: object;
```

Defined in: [src/types/request/admin/apps.ts:75](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/apps.ts#L75)

#### emails?

```ts
optional emails: string[];
```

##### Description

Sets emails for connector authorization.

#### urls?

```ts
optional urls: string[];
```

##### Description

Sets allowed URLs for the app.

#### Description

Domain restrictions for the app.

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

***

### workflow\_auth\_strategy?

```ts
optional workflow_auth_strategy: "builder_choice" | "end_user_only";
```

Defined in: [src/types/request/admin/apps.ts:82](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/apps.ts#L82)

#### Description

The workflow auth permission.
