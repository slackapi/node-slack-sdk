[@slack/web-api](../index.md) / UserConnectionPrimaryProvider

# Interface: UserConnectionPrimaryProvider

Defined in: [packages/web-api/src/types/request/apps.ts:59](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L59)

## Properties

### accessory?

```ts
optional accessory?: Overflow;
```

Defined in: [packages/web-api/src/types/request/apps.ts:85](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L85)

#### Description

Overflow menu shown when connected (e.g., Disconnect, Re-authenticate).

***

### auth\_url?

```ts
optional auth_url?: string;
```

Defined in: [packages/web-api/src/types/request/apps.ts:77](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L77)

#### Description

OAuth redirect URL opened when the user clicks **Connect**. Must be HTTPs format.

***

### connected\_context?

```ts
optional connected_context?: PlainTextElement;
```

Defined in: [packages/web-api/src/types/request/apps.ts:83](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L83)

#### Description

Additional context about the connection (e.g., org or workspace name).

***

### connected\_identity?

```ts
optional connected_identity?: PlainTextElement;
```

Defined in: [packages/web-api/src/types/request/apps.ts:81](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L81)

#### Description

Display name of the connected account, shown when `is_connected` is `true`.

***

### description?

```ts
optional description?: PlainTextElement;
```

Defined in: [packages/web-api/src/types/request/apps.ts:73](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L73)

#### Description

Brief description of what this connection enables.

***

### disconnect\_url?

```ts
optional disconnect_url?: string;
```

Defined in: [packages/web-api/src/types/request/apps.ts:79](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L79)

#### Description

URL opened when the user clicks **Disconnect**. Must be HTTPs format on a registered auth host.

***

### icon\_url?

```ts
optional icon_url?: string;
```

Defined in: [packages/web-api/src/types/request/apps.ts:75](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L75)

#### Description

URL for the provider icon image. Must be HTTPs format. Falls back to the app's avatar when absent.

***

### is\_connected

```ts
is_connected: boolean;
```

Defined in: [packages/web-api/src/types/request/apps.ts:71](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L71)

#### Description

Whether this provider is currently connected or disconnected. Slack records this state for the user,
so an omitted value would be indistinguishable from an explicit `false` and silently mark the user disconnected.

***

### name

```ts
name: PlainTextElement;
```

Defined in: [packages/web-api/src/types/request/apps.ts:66](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L66)

#### Description

Human-readable name of the provider.

***

### value

```ts
value: string;
```

Defined in: [packages/web-api/src/types/request/apps.ts:64](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L64)

#### Description

Unique identifier for this provider within the app. Included in interaction payloads and used to
derive the connect button `action_id` (`auth_provider_connect_<value>`).
