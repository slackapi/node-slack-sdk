# Interface: AdminUsersSessionSetSettingsArguments

## Extends

- `UserIDs`.`TokenOverridable`

## Properties

### desktop\_app\_browser\_quit?

```ts
optional desktop_app_browser_quit: boolean;
```

#### Description

Terminate the session when the client—either the desktop app or a browser window—is closed.

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:125](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/users.ts#L125)

***

### duration?

```ts
optional duration: number;
```

#### Description

The session duration in seconds. The minimum value is 28800, which represents 8 hours;
the max value is 315569520 or 10 years (that's a long Slack session).

#### Defined in

[packages/web-api/src/types/request/admin/users.ts:130](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/admin/users.ts#L130)

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

***

### user\_ids

```ts
user_ids: [string, ...string[]];
```

#### Description

List of encoded user IDs.

#### Inherited from

`UserIDs.user_ids`

#### Defined in

[packages/web-api/src/types/request/common.ts:83](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L83)
