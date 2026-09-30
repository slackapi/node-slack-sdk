[@slack/web-api](../index.md) / AgentsConversationsGetCanvasArguments

# Interface: AgentsConversationsGetCanvasArguments

Defined in: [packages/web-api/src/types/request/agents.ts:48](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L48)

## Extends

- `TokenOverridable`

## Properties

### canvas\_id

```ts
canvas_id: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:52](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L52)

#### Description

Encoded ID of the canvas to fetch.

***

### channel

```ts
channel: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L50)

#### Description

ID of the agent session channel the canvas belongs to.

***

### content\_format?

```ts
optional content_format?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L54)

#### Description

Format to render the canvas content in. Defaults to `markdown`.

***

### include\_resolved?

```ts
optional include_resolved?: boolean;
```

Defined in: [packages/web-api/src/types/request/agents.ts:56](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L56)

#### Description

Whether to include resolved comment threads in the response. Defaults to `false`.

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
