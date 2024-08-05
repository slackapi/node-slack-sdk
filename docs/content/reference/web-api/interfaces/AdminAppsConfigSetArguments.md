# Interface: AdminAppsConfigSetArguments

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

[packages/web-api/src/types/request/common.ts:88](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L88)

***

### domain\_restrictions?

```ts
optional domain_restrictions: object;
```

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

#### Defined in

[packages/web-api/src/types/request/admin/apps.ts:73](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/apps.ts#L73)

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

***

### workflow\_auth\_strategy?

```ts
optional workflow_auth_strategy: "builder_choice" | "end_user_only";
```

#### Description

The workflow auth permission.

#### Defined in

[packages/web-api/src/types/request/admin/apps.ts:80](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/apps.ts#L80)
