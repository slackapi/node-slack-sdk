[@slack/web-api](../index.md) / ChatPostMessageArguments

# Type Alias: ChatPostMessageArguments

```ts
type ChatPostMessageArguments = TokenOverridable & MessageContents & ReplyInThread & Authorship & Parse & LinkNames & Metadata & Unfurls & object;
```

Defined in: [src/types/request/chat.ts:177](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L177)

## Type declaration

### mrkdwn?

```ts
optional mrkdwn: boolean;
```

#### Description

Disable Slack markup parsing by setting to `false`. Enabled by default.
