[@slack/web-api](../index.md) / AdminUsersSessionSetSettingsArguments

# Interface: AdminUsersSessionSetSettingsArguments

Defined in: [packages/web-api/src/types/request/admin/users.ts:142](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L142)

## Extends

- `UserIDs`.`TokenOverridable`

## Properties

### desktop\_app\_browser\_quit?

```ts
optional desktop_app_browser_quit?: boolean;
```

Defined in: [packages/web-api/src/types/request/admin/users.ts:144](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L144)

#### Description

Terminate the session when the client—either the desktop app or a browser window—is closed.

***

### duration?

```ts
optional duration?: number;
```

Defined in: [packages/web-api/src/types/request/admin/users.ts:149](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/admin/users.ts#L149)

#### Description

The session duration in seconds. The minimum value is 28800, which represents 8 hours;
the max value is 315569520 or 10 years (that's a long Slack session).

***

### token?

```ts
optional token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```

***

### user\_ids

```ts
user_ids: [string, ...string[]];
```

Defined in: [packages/web-api/src/types/request/common.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L92)

#### Description

List of encoded user IDs.

#### Inherited from

```ts
UserIDs.user_ids
```
