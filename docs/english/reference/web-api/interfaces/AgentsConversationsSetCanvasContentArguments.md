[@slack/web-api](../index.md) / AgentsConversationsSetCanvasContentArguments

# Interface: AgentsConversationsSetCanvasContentArguments

Defined in: [packages/web-api/src/types/request/agents.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L76)

## Extends

- `TokenOverridable`

## Properties

### canvas\_id

```ts
canvas_id: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:80](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L80)

#### Description

Encoded ID of the canvas whose content to replace.

***

### channel

```ts
channel: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:78](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L78)

#### Description

ID of the agent session channel the canvas is attached to.

***

### content

```ts
content: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:85](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L85)

#### Description

The full new canvas content as markdown. The server diffs this against the current content and applies
only the changed sections.

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
