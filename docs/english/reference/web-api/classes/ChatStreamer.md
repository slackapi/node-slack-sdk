[@slack/web-api](../index.md) / ChatStreamer

# Class: ChatStreamer

Defined in: [packages/web-api/src/chat-stream.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/chat-stream.ts#L15)

## Constructors

### Constructor

```ts
new ChatStreamer(
   client, 
   logger, 
   args, 
   options): ChatStreamer;
```

Defined in: [packages/web-api/src/chat-stream.ts:47](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/chat-stream.ts#L47)

Instantiate a new chat streamer.

#### Parameters

##### client

[`WebClient`](WebClient.md)

##### logger

[`Logger`](../interfaces/Logger.md)

##### args

[`ChatStartStreamArguments`](../interfaces/ChatStartStreamArguments.md)

##### options

[`ChatStreamerOptions`](../interfaces/ChatStreamerOptions.md)

#### Returns

`ChatStreamer`

#### Description

The "constructor" method creates a unique ChatStreamer instance that keeps track of one chat stream.

#### Example

```ts
const client = new WebClient(process.env.SLACK_BOT_TOKEN);
const logger = new ConsoleLogger();
const args = {
  channel: "C0123456789",
  thread_ts: "1700000001.123456",
  recipient_team_id: "T0123456789",
  recipient_user_id: "U0123456789",
};
const streamer = new ChatStreamer(client, logger, args, { buffer_size: 512 });
await streamer.append({
  markdown_text: "**hello world!**",
});
await streamer.stop();
```

#### See

 - [https://docs.slack.dev/reference/methods/chat.startStream](https://docs.slack.dev/reference/methods/chat.startStream)
 - [https://docs.slack.dev/reference/methods/chat.appendStream](https://docs.slack.dev/reference/methods/chat.appendStream)
 - [https://docs.slack.dev/reference/methods/chat.stopStream](https://docs.slack.dev/reference/methods/chat.stopStream)

## Methods

### append()

```ts
append(args): Promise<
  | ChatAppendStreamResponse
  | ChatStartStreamResponse
| null>;
```

Defined in: [packages/web-api/src/chat-stream.ts:77](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/chat-stream.ts#L77)

Append to the stream.

#### Parameters

##### args

`Omit`\<[`ChatAppendStreamArguments`](../interfaces/ChatAppendStreamArguments.md), `"channel"` \| `"ts"`\>

#### Returns

`Promise`\<
  \| [`ChatAppendStreamResponse`](../type-aliases/ChatAppendStreamResponse.md)
  \| [`ChatStartStreamResponse`](../type-aliases/ChatStartStreamResponse.md)
  \| `null`\>

#### Description

The "append" method appends to the chat stream being used. This method can be called multiple times. After the stream is stopped this method cannot be called.

#### Example

```ts
const streamer = client.chatStream({
  channel: "C0123456789",
  thread_ts: "1700000001.123456",
  recipient_team_id: "T0123456789",
  recipient_user_id: "U0123456789",
});
await streamer.append({
  markdown_text: "**hello wo",
});
await streamer.append({
  markdown_text: "rld!**",
});
await streamer.stop();
```

#### See

[https://docs.slack.dev/reference/methods/chat.appendStream](https://docs.slack.dev/reference/methods/chat.appendStream)

***

### stop()

```ts
stop(args?): Promise<ChatStopStreamResponse>;
```

Defined in: [packages/web-api/src/chat-stream.ts:123](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/chat-stream.ts#L123)

Stop the stream and finalize the message.

#### Parameters

##### args?

`Omit`\<[`ChatStopStreamArguments`](../type-aliases/ChatStopStreamArguments.md), `"channel"` \| `"ts"`\>

#### Returns

`Promise`\<[`ChatStopStreamResponse`](../type-aliases/ChatStopStreamResponse.md)\>

#### Description

The "stop" method stops the chat stream being used. This method can be called once to end the stream. Additional "blocks" and "metadata" can be provided.

#### Example

```ts
const streamer = client.chatStream({
  channel: "C0123456789",
  thread_ts: "1700000001.123456",
  recipient_team_id: "T0123456789",
  recipient_user_id: "U0123456789",
});
await streamer.append({
  markdown_text: "**hello world!**",
});
await streamer.stop();
```

#### See

[https://docs.slack.dev/reference/methods/chat.stopStream](https://docs.slack.dev/reference/methods/chat.stopStream)
