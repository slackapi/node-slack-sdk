[@slack/web-api](../index.md) / UserConnectionPrimaryProvider

# Interface: UserConnectionPrimaryProvider

Defined in: [packages/web-api/src/types/request/apps.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L76)

## Properties

### accessory?

```ts
accessory?: Overflow;
```

Defined in: [packages/web-api/src/types/request/apps.ts:102](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L102)

#### Description

Overflow menu shown when connected (e.g., Disconnect, Re-authenticate).

***

### auth\_url?

```ts
auth_url?: string;
```

Defined in: [packages/web-api/src/types/request/apps.ts:94](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L94)

#### Description

OAuth redirect URL opened when the user clicks **Connect**. Must be HTTPs format.

***

### connected\_context?

```ts
connected_context?: PlainTextElement;
```

Defined in: [packages/web-api/src/types/request/apps.ts:100](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L100)

#### Description

Additional context about the connection (e.g., org or workspace name).

***

### connected\_identity?

```ts
connected_identity?: PlainTextElement;
```

Defined in: [packages/web-api/src/types/request/apps.ts:98](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L98)

#### Description

Display name of the connected account, shown when `is_connected` is `true`.

***

### description?

```ts
description?: PlainTextElement;
```

Defined in: [packages/web-api/src/types/request/apps.ts:90](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L90)

#### Description

Brief description of what this connection enables.

***

### disconnect\_url?

```ts
disconnect_url?: string;
```

Defined in: [packages/web-api/src/types/request/apps.ts:96](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L96)

#### Description

URL opened when the user clicks **Disconnect**. Must be HTTPs format on a registered auth host.

***

### icon\_url?

```ts
icon_url?: string;
```

Defined in: [packages/web-api/src/types/request/apps.ts:92](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L92)

#### Description

URL for the provider icon image. Must be HTTPs format. Falls back to the app's avatar when absent.

***

### is\_connected

```ts
is_connected: boolean;
```

Defined in: [packages/web-api/src/types/request/apps.ts:88](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L88)

#### Description

Whether this provider is currently connected or disconnected. Slack records this state for the user,
so an omitted value would be indistinguishable from an explicit `false` and silently mark the user disconnected.

***

### name

```ts
name: PlainTextElement;
```

Defined in: [packages/web-api/src/types/request/apps.ts:83](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L83)

#### Description

Human-readable name of the provider.

***

### value

```ts
value: string;
```

Defined in: [packages/web-api/src/types/request/apps.ts:81](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L81)

#### Description

Unique identifier for this provider within the app. Included in interaction payloads and used to
derive the connect button `action_id` (`auth_provider_connect_<value>`).
