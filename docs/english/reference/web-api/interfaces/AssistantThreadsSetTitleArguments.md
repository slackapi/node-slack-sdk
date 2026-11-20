[@slack/web-api](../index.md) / AssistantThreadsSetTitleArguments

# Interface: AssistantThreadsSetTitleArguments

Defined in: [packages/web-api/src/types/request/assistant.ts:117](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L117)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:119](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L119)

#### Description

Channel ID containing the assistant thread.

***

### thread\_ts

```ts
thread_ts: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:121](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L121)

#### Description

Message timestamp of the thread.

***

### title

```ts
title: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:123](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L123)

#### Description

Title of the thread.

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
