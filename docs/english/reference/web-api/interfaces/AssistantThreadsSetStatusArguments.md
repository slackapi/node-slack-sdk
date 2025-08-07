[@slack/web-api](../index.md) / AssistantThreadsSetStatusArguments

# Interface: AssistantThreadsSetStatusArguments

Defined in: [src/types/request/assistant.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L4)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [src/types/request/assistant.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L6)

#### Description

Channel ID containing the assistant thread.

***

### status

```ts
status: string;
```

Defined in: [src/types/request/assistant.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L8)

#### Description

Status of the assistant (e.g. 'is thinking...')

***

### thread\_ts

```ts
thread_ts: string;
```

Defined in: [src/types/request/assistant.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L10)

#### Description

Message timestamp of the thread.

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
