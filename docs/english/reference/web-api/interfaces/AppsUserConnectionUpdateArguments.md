[@slack/web-api](../index.md) / AppsUserConnectionUpdateArguments

# Interface: AppsUserConnectionUpdateArguments

Defined in: [packages/web-api/src/types/request/apps.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L36)

## Extends

- `TokenOverridable`

## Properties

### status

```ts
status: string;
```

Defined in: [packages/web-api/src/types/request/apps.ts:40](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L40)

#### Description

The connection status value to assign to the user. `connected` or `disconnected`.

***

### token?

```ts
optional token: string;
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

Defined in: [packages/web-api/src/types/request/apps.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L38)

#### Description

The identifier for the user receiving the status update.
