[@slack/web-api](../index.md) / AgentsSessionsRenameArguments

# Interface: AgentsSessionsRenameArguments

Defined in: [packages/web-api/src/types/request/agents.ts:209](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L209)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:211](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L211)

#### Description

ID of the channel containing the agent session.

***

### thread\_ts?

```ts
optional thread_ts?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:218](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L218)

#### Description

Timestamp of the thread root message the session is scoped to. Required for thread-based sessions in
regular channels and DMs. Must be omitted for session channels.

***

### title

```ts
title: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:213](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L213)

#### Description

New title for the agent session (1-200 characters). For a session channel, this also renames the channel.

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
