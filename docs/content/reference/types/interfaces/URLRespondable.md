[@slack/types](../index.md) / URLRespondable

# Interface: URLRespondable

Defined in: [block-kit/extensions.ts:60](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L60)

## Extended by

- [`ConversationsSelect`](ConversationsSelect.md)
- [`ChannelsSelect`](ChannelsSelect.md)

## Properties

### response\_url\_enabled?

```ts
optional response_url_enabled: boolean;
```

Defined in: [block-kit/extensions.ts:67](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L67)

#### Description

When set to `true`, the [\`view\_submission\` payload](https://docs.slack.dev/reference/interaction-payloads/view-interactions-payload#view_submission)
from the menu's parent view will contain a `response_url`. This `response_url` can be used for
[message responses](https://docs.slack.dev/interactivity/handling-user-interaction#message_responses). The target conversation
for the message will be determined by the value of this select menu.
