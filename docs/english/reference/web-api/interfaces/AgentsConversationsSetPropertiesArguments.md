[@slack/web-api](../index.md) / AgentsConversationsSetPropertiesArguments

# Interface: AgentsConversationsSetPropertiesArguments

Defined in: [packages/web-api/src/types/request/agents.ts:112](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L112)

## Extends

- `TokenOverridable`

## Properties

### agent\_resource?

```ts
optional agent_resource?: object;
```

Defined in: [packages/web-api/src/types/request/agents.ts:139](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L139)

#### provider?

```ts
optional provider?: string;
```

##### Description

Provider of the external resource. Maximum 64 characters.

#### resource\_type?

```ts
optional resource_type?: string;
```

##### Description

Type of the external resource. Maximum 64 characters.

#### title?

```ts
optional title?: string;
```

##### Description

Display title of the external resource. Maximum 255 characters.

#### url?

```ts
optional url?: string;
```

##### Description

URL of the external resource. Maximum 2048 characters.

#### Description

Agent resource properties to set. Only provided fields are updated.

***

### channel\_id

```ts
channel_id: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:114](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L114)

#### Description

ID of the code channel to update.

***

### code\_channel?

```ts
optional code_channel?: object;
```

Defined in: [packages/web-api/src/types/request/agents.ts:116](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L116)

#### context\_bar\_items?

```ts
optional context_bar_items?: object[];
```

##### Description

Items displayed in the channel context bar. Maximum 5 items. The array replaces the current set.

#### summary\_message?

```ts
optional summary_message?: object;
```

##### Description

Records which message in the channel represents the current session summary.

##### summary\_message.message\_ts

```ts
message_ts: string;
```

###### Description

Timestamp of the summary message in the code channel.

##### summary\_message.thread\_ts?

```ts
optional thread_ts?: string;
```

###### Description

Thread timestamp if the summary message is a thread reply. Clients need this to fetch the message via conversations.replies.

#### Description

Code channel properties to set. Only provided fields are updated.

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
