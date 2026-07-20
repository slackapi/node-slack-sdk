[@slack/web-api](../index.md) / ChatAppendStreamArguments

# Interface: ChatAppendStreamArguments

Defined in: [packages/web-api/src/types/request/chat.ts:172](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L172)

## Extends

- `TokenOverridable`.`ChannelAndTS`.`Partial`\<`MarkdownText`\>

## Properties

### channel

```ts
channel: string;
```

Defined in: [packages/web-api/src/types/request/chat.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L22)

#### Description

Channel ID for the message.

#### Inherited from

```ts
ChannelAndTS.channel
```

***

### chunks?

```ts
optional chunks: AnyChunk[];
```

Defined in: [packages/web-api/src/types/request/chat.ts:177](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L177)

#### Description

An array of [chunk objects](https://docs.slack.dev/messaging/sending-and-scheduling-messages#text-streaming) to append to the stream.
Either `markdown_text` or `chunks` is required.

***

### markdown\_text?

```ts
optional markdown_text: string;
```

Defined in: [packages/web-api/src/types/request/chat.ts:63](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L63)

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

***

### ts

```ts
ts: string;
```

Defined in: [packages/web-api/src/types/request/chat.ts:26](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L26)

#### Description

Timestamp of the message.

#### Inherited from

```ts
ChannelAndTS.ts
```
