[@slack/web-api](../index.md) / AgentsConversationsSetViewArguments

# Interface: AgentsConversationsSetViewArguments

Defined in: [packages/web-api/src/types/request/agents.ts:152](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L152)

## Extends

- `TokenOverridable`

## Properties

### access\_level?

```ts
optional access_level?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:179](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L179)

#### Description

For canvas views: access level granted to the channel for the canvas tab. Defaults to `write`. Use
`comment` to grant channel members comment access (read and comment, no editing) so the agent remains the sole author of the canvas text.

***

### agent\_content\_hash?

```ts
optional agent_content_hash?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:184](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L184)

#### Description

For canvas views: hash of the canvas-derived markdown the agent last wrote, recorded so the agent can
later detect human edits to the canvas. Opaque to the server.

***

### base\_branch?

```ts
optional base_branch?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:188](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L188)

#### Description

For diff views: base branch name for display purposes.

***

### blocks?

```ts
optional blocks?: (Block | KnownBlock)[];
```

Defined in: [packages/web-api/src/types/request/agents.ts:172](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L172)

#### Description

Block Kit blocks to render in the view tab. Required when `type` is `block_kit`; ignored otherwise.

***

### canvas\_id?

```ts
optional canvas_id?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:174](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L174)

#### Description

Encoded ID of the canvas to attach as the view. Required when `type` is `canvas`; ignored otherwise.

***

### channel\_id

```ts
channel_id: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:154](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L154)

#### Description

ID of the code channel to render the view in.

***

### content?

```ts
optional content?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:170](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L170)

#### Description

View content. For `html`, a full self-contained HTML document; for `diff`, raw unified diff text.
Capped at 1,000,000 bytes — larger content returns content_too_large. The cap is enforced by the handler (not schema maxLength) so the documented error code actually surfaces instead of a generic argument-validation failure. Required when type is html or diff.

***

### csp?

```ts
optional csp?: object;
```

Defined in: [packages/web-api/src/types/request/agents.ts:200](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L200)

#### connect\_domains?

```ts
optional connect_domains?: string[];
```

##### Description

Origins the view may fetch()/XHR/WebSocket to. Accepted and stored, but not honored at render time yet.

#### resource\_domains?

```ts
optional resource_domains?: string[];
```

##### Description

Origins the view may load scripts/styles/fonts/images/media from, merged into the curated CDN allowlist at render time.

#### Description

Content-Security-Policy domain declarations for the view. Domains are validated server-side
(https-only, no private/internal hosts) and persisted. Only resource_domains is honored at render time today; connect_domains is accepted and stored for forward-compatibility but NOT honored yet.

***

### head\_branch?

```ts
optional head_branch?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:190](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L190)

#### Description

For diff views: head branch name for display purposes.

***

### name?

```ts
optional name?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:195](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L195)

#### Description

Display label for the view tab (`name` wins if both are
supplied). Defaults to the last path segment of `view_key`, stripped of any .html/.htm extension.

***

### pr\_url?

```ts
optional pr_url?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:186](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L186)

#### Description

For pull_request views: the pull request's URL. Required when `type` is `pull_request`; ignored otherwise.

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

### type?

```ts
optional type?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:160](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L160)

#### Description

The kind of view to create or update. Defaults to `html`. Determines which other arguments are
required: `html` and `diff` require `content`, `block_kit` requires `blocks`, `canvas` requires `canvas_id`,
`pull_request` requires `pr_url`.

***

### view\_key?

```ts
optional view_key?: string;
```

Defined in: [packages/web-api/src/types/request/agents.ts:165](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/agents.ts#L165)

#### Description

Agent-assigned stable identity for the view (e.g. the source file path on the agent's machine). Used as
the upsert key: calls with the same `view_key` update the same view. Required for html, block_kit, and canvas views; ignored for diff (a diff view is a per-channel singleton).
