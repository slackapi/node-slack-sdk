[@slack/web-api](../index.md) / AssistantThreadsSetStatusArguments

# Interface: AssistantThreadsSetStatusArguments

Defined in: [packages/web-api/src/types/request/assistant.ts:71](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L71)

## Extends

- `TokenOverridable`

## Properties

### channel\_id

```ts
channel_id: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:73](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L73)

#### Description

Channel ID containing the assistant thread.

***

### icon\_emoji?

```ts
icon_emoji?: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:84](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L84)

#### Description

Emoji to use as the icon for this message. Overrides `icon_url`.

#### Example

```ts
:chart_with_upwards_trend:
```

***

### icon\_url?

```ts
icon_url?: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:89](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L89)

#### Description

Image URL to use as the icon for this message.

#### Example

```ts
http://lorempixel.com/48/48
```

***

### loading\_messages?

```ts
loading_messages?: string[];
```

Defined in: [packages/web-api/src/types/request/assistant.ts:79](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L79)

#### Description

The list of messages to rotate through as a loading indicator.

***

### status

```ts
status: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:75](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L75)

#### Description

Status of the assistant (e.g. 'is thinking...')

***

### thread\_ts

```ts
thread_ts: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:77](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L77)

#### Description

Message timestamp of the thread.

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

***

### username?

```ts
username?: string;
```

Defined in: [packages/web-api/src/types/request/assistant.ts:94](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/assistant.ts#L94)

#### Description

The bot's username to display.

#### Example

```ts
My Bot
```
