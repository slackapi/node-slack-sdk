[@slack/web-api](../index.md) / ChatStartStreamArguments

# Interface: ChatStartStreamArguments

Defined in: [packages/web-api/src/types/request/chat.ts:235](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L235)

## Extends

- `TokenOverridable`.`Channel`.`Partial`\<`MarkdownText`\>.`ThreadTS`

## Properties

### channel

```ts
channel: string;
```

Defined in: [packages/web-api/src/types/request/chat.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L21)

#### Description

Channel ID for the message.

#### Inherited from

```ts
Channel.channel
```

***

### chunks?

```ts
optional chunks: AnyChunk[];
```

Defined in: [packages/web-api/src/types/request/chat.ts:247](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L247)

#### Description

An array of [chunk objects](https://docs.slack.dev/messaging/sending-and-scheduling-messages#text-streaming) to start the stream with.
Either `markdown_text` or `chunks` is required.

***

### markdown\_text?

```ts
optional markdown_text: string;
```

Defined in: [packages/web-api/src/types/request/chat.ts:62](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L62)

#### Description

Accepts message text formatted in markdown. This argument should not be used in conjunction with `blocks` or `text`. Limit this field to 12,000 characters.

#### Example

```ts
**This is bold text**
```

#### Inherited from

```ts
Partial.markdown_text
```

***

### recipient\_team\_id?

```ts
optional recipient_team_id: string;
```

Defined in: [packages/web-api/src/types/request/chat.ts:240](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L240)

#### Description

The ID of the team that is associated with `recipient_user_id`.
This is required when starting a streaming conversation outside of a DM.

***

### recipient\_user\_id?

```ts
optional recipient_user_id: string;
```

Defined in: [packages/web-api/src/types/request/chat.ts:245](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L245)

#### Description

The ID of the user to receive the streaming conversation messages.
This is required when starting a streaming conversation outside of a DM.

***

### task\_display\_mode?

```ts
optional task_display_mode: string;
```

Defined in: [packages/web-api/src/types/request/chat.ts:262](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L262)

#### Description

Specifies how tasks are displayed in the message. A "timeline" displays individual tasks
 with text and "plan" displays all tasks together.

***

### thread\_ts

```ts
thread_ts: string;
```

Defined in: [packages/web-api/src/types/request/chat.ts:91](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L91)

#### Description

Provide another message's `ts` value to post this message in a thread. Avoid using a reply's `ts`
value; use its parent's value instead.

#### Inherited from

```ts
ThreadTS.thread_ts
```

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
