[@slack/web-api](../index.md) / AssistantThreadsSetTitleArguments

# Interface: AssistantThreadsSetTitleArguments

Defined in: [src/types/request/assistant.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L33)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [src/types/request/assistant.ts:35](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L35)

#### Description

Channel ID containing the assistant thread.

***

### thread\_ts

```ts
thread_ts: string;
```

Defined in: [src/types/request/assistant.ts:37](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L37)

#### Description

Message timestamp of the thread.

***

### title

```ts
title: string;
```

Defined in: [src/types/request/assistant.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L39)

#### Description

Title of the thread.

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
