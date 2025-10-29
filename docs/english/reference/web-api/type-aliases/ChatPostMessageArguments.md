[@slack/web-api](../index.md) / ChatPostMessageArguments

# Type Alias: ChatPostMessageArguments

```ts
type ChatPostMessageArguments = TokenOverridable & MessageContents & ReplyInThread & Authorship & Parse & LinkNames & ChatPostMessageMetadata & Unfurls & object;
```

Defined in: [src/types/request/chat.ts:202](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/chat.ts#L202)

## Type Declaration

### mrkdwn?

```ts
optional mrkdwn: boolean;
```

#### Description

Disable Slack markup parsing by setting to `false`. Enabled by default.
