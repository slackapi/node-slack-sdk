[@slack/web-api](../index.md) / AgentsConversationsRemoveViewArguments

# Interface: AgentsConversationsRemoveViewArguments

Defined in: [packages/web-api/src/types/request/agents.ts:66](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L66)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:68](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L68)

#### Description

ID of the code channel to remove the view from.

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

### view\_id?

```ts
optional view_id?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:72](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L72)

#### Description

Encoded channel tab ID of the view to remove. Provide exactly one of `view_key` or `view_id`.

***

### view\_key?

```ts
optional view_key?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L70)

#### Description

Agent-assigned key of the view to remove. Provide exactly one of `view_key` or `view_id`.
