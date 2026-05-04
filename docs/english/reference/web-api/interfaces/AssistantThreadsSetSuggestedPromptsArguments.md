[@slack/web-api](../index.md) / AssistantThreadsSetSuggestedPromptsArguments

# Interface: AssistantThreadsSetSuggestedPromptsArguments

Defined in: [packages/web-api/src/types/request/assistant.ts:31](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L31)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L33)

#### Description

Channel ID containing the assistant thread.

***

### prompts

```ts
prompts: AssistantPrompt[];
```

Defined in: [packages/web-api/src/types/request/assistant.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L35)

#### Description

Prompt suggestions that appear when opening assistant thread.

***

### thread\_ts

```ts
thread_ts: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L37)

#### Description

Message timestamp of the thread.

***

### title?

```ts
optional title: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L39)

#### Description

Title for the prompts.

***

### token?

```ts
optional token: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```
