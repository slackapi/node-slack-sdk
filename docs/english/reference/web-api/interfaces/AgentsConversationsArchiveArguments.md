[@slack/web-api](../index.md) / AgentsConversationsArchiveArguments

# Interface: AgentsConversationsArchiveArguments

Defined in: [packages/web-api/src/types/request/agents.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L6)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L8)

#### Description

ID of the code channel to archive.

***

### summary\_message\_ts?

```ts
optional summary_message_ts?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L13)

#### Description

Timestamp of a message in the code channel to share back as a thread reply on the origin message.
Requires the channel to have an `origin_link` set.

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
