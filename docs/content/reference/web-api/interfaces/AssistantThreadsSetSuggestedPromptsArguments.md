[@slack/web-api](../index.md) / AssistantThreadsSetSuggestedPromptsArguments

# Interface: AssistantThreadsSetSuggestedPromptsArguments

Defined in: [src/types/request/assistant.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L14)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [src/types/request/assistant.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L16)

#### Description

Channel ID containing the assistant thread.

***

### prompts

```ts
prompts: AssistantPrompt[];
```

Defined in: [src/types/request/assistant.ts:18](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L18)

#### Description

Prompt suggestions that appear when opening assistant thread.

***

### thread\_ts

```ts
thread_ts: string;
```

Defined in: [src/types/request/assistant.ts:20](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L20)

#### Description

Message timestamp of the thread.

***

### title?

```ts
optional title: string;
```

Defined in: [src/types/request/assistant.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L22)

#### Description

Title for the prompts.

***

### token?

```ts
optional token: string;
```

Defined in: [src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```
