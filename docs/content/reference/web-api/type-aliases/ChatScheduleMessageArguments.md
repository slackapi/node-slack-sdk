# Type Alias: ChatScheduleMessageArguments

```ts
type ChatScheduleMessageArguments: TokenOverridable & MessageContents & object & ReplyInThread & Parse & LinkNames & AsUser & Metadata & Unfurls;
```

## Type declaration

### post\_at

```ts
post_at: string | number;
```

#### Description

Unix EPOCH timestamp of time in future to send the message.

## Defined in

[packages/web-api/src/types/request/chat.ts:177](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L177)
