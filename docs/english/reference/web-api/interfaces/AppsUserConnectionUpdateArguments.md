[@slack/web-api](../index.md) / AppsUserConnectionUpdateArguments

# Interface: AppsUserConnectionUpdateArguments

Defined in: [packages/web-api/src/types/request/apps.ts:109](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L109)

## Extends

- `TokenOverridable`

## Properties

### status

```ts
status: string;
```

Defined in: [packages/web-api/src/types/request/apps.ts:113](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L113)

#### Description

The connection status value to assign to the user. `connected` or `disconnected`.

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

### user\_id

```ts
user_id: string;
```

Defined in: [packages/web-api/src/types/request/apps.ts:111](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L111)

#### Description

The identifier for the user receiving the status update.
