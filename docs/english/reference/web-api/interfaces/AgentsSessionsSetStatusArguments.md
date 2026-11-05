[@slack/web-api](../index.md) / AgentsSessionsSetStatusArguments

# Interface: AgentsSessionsSetStatusArguments

Defined in: [packages/web-api/src/types/request/agents.ts:222](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L222)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:224](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L224)

#### Description

ID of the channel containing the agent session.

***

### icon\_emoji?

```ts
optional icon_emoji?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:247](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L247)

#### Description

Emoji to use as the agent's icon. Takes priority over `icon_url`. Remains in effect until you clear it
(pass `null`) or set a new value. Requires the `chat:write.customize` scope.

#### Example

```ts
:chart_with_upwards_trend:
```

***

### icon\_url?

```ts
optional icon_url?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:253](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L253)

#### Description

URL to an image to use as the agent's icon. Remains in effect until you clear it (pass `null`) or set
a new value. Requires the `chat:write.customize` scope.

#### Example

```ts
http://lorempixel.com/48/48
```

***

### initiator\_user\_id?

```ts
optional initiator_user_id?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:241](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L241)

#### Description

The user who initiated the session. Only used when creating a new session; ignored if the session
already exists. Must be a member of the channel.

***

### status

```ts
status: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:226](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L226)

#### Description

The lifecycle status to set. Acceptable values: `active`, `processing`, `suspended`, `closed`.

***

### thread\_ts?

```ts
optional thread_ts?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:231](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L231)

#### Description

Timestamp of the thread root message the session is scoped to. Required for thread-based sessions in
regular channels and DMs. Must be omitted for session channels.

***

### title?

```ts
optional title?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:236](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L236)

#### Description

Title for the agent session (max 200 characters). Only used when creating a new session; ignored if
the session already exists. To rename an existing session, use `agents.sessions.rename`.

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

### username?

```ts
optional username?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:259](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L259)

#### Description

Display name override for the agent (max 200 characters). Remains in effect until you clear it (pass
`null`) or set a new value. Requires the `chat:write.customize` scope.

#### Example

```ts
My Bot
```
