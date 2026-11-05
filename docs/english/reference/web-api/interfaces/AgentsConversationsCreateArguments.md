[@slack/web-api](../index.md) / AgentsConversationsCreateArguments

# Interface: AgentsConversationsCreateArguments

Defined in: [packages/web-api/src/types/request/agents.ts:17](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L17)

## Extends

- `TokenOverridable`

## Properties

### is\_private?

```ts
optional is_private?: boolean;
```

Defined in: [packages/web-api/src/types/request/agents.ts:34](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L34)

#### Description

Create a private channel instead of a public one.

***

### name

```ts
name: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:32](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L32)

#### Description

A friendly display name for the code channel. Optional when `origin_channel_id` and `origin_message_ts`
are provided — in that case the channel is named from the origin message and re-titled automatically. Required when no origin link is given.

***

### origin\_channel\_id?

```ts
optional origin_channel_id?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L39)

#### Description

The channel ID where the agent session was initiated from. Must be provided together with
`origin_message_ts`. The channel must be accessible to the calling user and must not be externally shared (Slack Connect). When `team_id` is omitted with an org token, the channel is created in the same workspace as this origin channel.

***

### origin\_message\_ts?

```ts
optional origin_message_ts?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L44)

#### Description

The message timestamp in the origin channel that started the agent session. Must be provided together
with `origin_channel_id`. The author of this message is automatically invited to the newly created code channel.

***

### session\_id?

```ts
optional session_id?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:27](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L27)

#### Description

An opaque identifier for the agent session. When provided, the call is idempotent: if a channel already
exists for this `session_id`, it is returned instead of creating a new one.

***

### team\_id?

```ts
optional team_id?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L22)

#### Description

Encoded team ID to create the channel in. Required for org tokens when `origin_channel_id` is not
provided. When omitted, the workspace is derived from the origin channel.

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
