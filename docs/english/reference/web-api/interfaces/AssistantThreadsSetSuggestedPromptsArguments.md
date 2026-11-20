[@slack/web-api](../index.md) / AssistantThreadsSetSuggestedPromptsArguments

# Interface: AssistantThreadsSetSuggestedPromptsArguments

Defined in: [packages/web-api/src/types/request/assistant.ts:98](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L98)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:100](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L100)

#### Description

Channel ID containing the assistant thread.

***

### prompts

```ts
prompts: AssistantPrompt[];
```

Defined in: [packages/web-api/src/types/request/assistant.ts:102](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L102)

#### Description

Prompt suggestions that appear when opening assistant thread.

***

### thread\_ts?

```ts
thread_ts?: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:104](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L104)

#### Description

Message timestamp of the thread.

***

### title?

```ts
title?: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:106](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L106)

#### Description

Title for the prompts.

***

### token?

```ts
token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`
