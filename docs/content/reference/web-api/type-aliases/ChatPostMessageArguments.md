# Type Alias: ChatPostMessageArguments

```ts
type ChatPostMessageArguments: TokenOverridable & MessageContents & ReplyInThread & Authorship & Parse & LinkNames & Metadata & Unfurls & object;
```

## Type declaration

### mrkdwn?

```ts
optional mrkdwn: boolean;
```

#### Description

Disable Slack markup parsing by setting to `false`. Enabled by default.

## Defined in

[packages/web-api/src/types/request/chat.ts:170](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/chat.ts#L170)
