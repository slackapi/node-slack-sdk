[@slack/web-api](../index.md) / ChatStopStreamArguments

# Type Alias: ChatStopStreamArguments

```ts
type ChatStopStreamArguments = TokenOverridable & ChannelAndTS & Partial<MarkdownText> & Partial<Metadata> & object;
```

Defined in: [src/types/request/chat.ts:234](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L234)

## Type declaration

### blocks?

```ts
optional blocks: (KnownBlock | Block)[];
```

Block formatted elements will be appended to the end of the message.
