[@slack/types](../index.md) / AuthProviderBlock

# Interface: AuthProviderBlock

Defined in: [block-kit/blocks.ts:142](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L142)

## Description

Displays authentication provider information, including its icon, name, and connection state.

## See

[Auth provider block reference](https://docs.slack.dev/reference/block-kit/blocks/auth-provider-block).

## Extends

- [`Block`](Block.md)

## Properties

### accessory?

```ts
optional accessory?: Overflow;
```

Defined in: [block-kit/blocks.ts:195](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L195)

#### Description

An [Overflow](Overflow.md) menu shown when connected, e.g. Disconnect or Re-authenticate.

***

### auth\_url?

```ts
optional auth_url?: string;
```

Defined in: [block-kit/blocks.ts:176](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L176)

#### Description

OAuth redirect URL opened when the user clicks Connect. Must be an HTTPS URL on a host listed in the
app manifest's `features.user_connections.auth_hosts`. Maximum length for this field is 3000 characters.

***

### block\_id?

```ts
optional block_id?: string;
```

Defined in: [block-kit/blocks.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L50)

#### Description

A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
You can use this `block_id` when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

***

### connected\_context?

```ts
optional connected_context?: PlainTextElement;
```

Defined in: [block-kit/blocks.ts:191](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L191)

#### Description

Additional context about the connection in the form of a [PlainTextElement](PlainTextElement.md), e.g. the org or
workspace name. Maximum length for the text in this field is 75 characters.

***

### connected\_identity?

```ts
optional connected_identity?: PlainTextElement;
```

Defined in: [block-kit/blocks.ts:186](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L186)

#### Description

Display name of the connected account in the form of a [PlainTextElement](PlainTextElement.md), shown when
`is_connected` is `true`. Maximum length for the text in this field is 75 characters.

***

### description?

```ts
optional description?: PlainTextElement;
```

Defined in: [block-kit/blocks.ts:166](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L166)

#### Description

Brief description of what this connection enables in the form of a [PlainTextElement](PlainTextElement.md).
Maximum length for the text in this field is 150 characters.

***

### disconnect\_url?

```ts
optional disconnect_url?: string;
```

Defined in: [block-kit/blocks.ts:181](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L181)

#### Description

URL opened when the user clicks Disconnect. Must be an HTTPS URL on a host listed in the app
manifest's `features.user_connections.auth_hosts`. Maximum length for this field is 3000 characters.

***

### fallback?

```ts
optional fallback?: KnownBlock[];
```

Defined in: [block-kit/blocks.ts:200](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L200)

#### Description

An array of stable [KnownBlock](../type-aliases/KnownBlock.md) objects rendered by clients that don't recognize
`auth_provider`, spliced into the parent blocks array.

***

### icon\_url?

```ts
optional icon_url?: string;
```

Defined in: [block-kit/blocks.ts:171](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L171)

#### Description

URL for the provider icon image. Must be an HTTPS URL. Falls back to the app's avatar when absent.
Maximum length for this field is 3000 characters.

***

### is\_connected

```ts
is_connected: boolean;
```

Defined in: [block-kit/blocks.ts:161](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L161)

#### Description

Whether this provider is currently connected. Slack records this state for the user.

***

### name

```ts
name: PlainTextElement;
```

Defined in: [block-kit/blocks.ts:157](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L157)

#### Description

Human-readable name of the provider in the form of a [PlainTextElement](PlainTextElement.md).
Maximum length for the text in this field is 75 characters.

***

### type

```ts
type: "auth_provider";
```

Defined in: [block-kit/blocks.ts:146](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L146)

#### Description

The type of block. For an auth provider block, `type` is always `auth_provider`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)

***

### value

```ts
value: string;
```

Defined in: [block-kit/blocks.ts:152](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L152)

#### Description

Unique identifier for this provider within the app. Included in interaction payloads and used to
derive the connect button `action_id` (`auth_provider_connect_<value>`). Maximum length for this field is 150
characters.
