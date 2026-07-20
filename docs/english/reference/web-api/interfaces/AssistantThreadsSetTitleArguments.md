[@slack/web-api](../index.md) / AssistantThreadsSetTitleArguments

# Interface: AssistantThreadsSetTitleArguments

Defined in: [packages/web-api/src/types/request/assistant.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L50)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:52](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L52)

#### Description

Channel ID containing the assistant thread.

***

### thread\_ts

```ts
thread_ts: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L54)

#### Description

Message timestamp of the thread.

***

### title

```ts
title: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:56](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L56)

#### Description

Title of the thread.

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
