# Interface: URLRespondable

## Extended by

- [`ConversationsSelect`](ConversationsSelect.md)
- [`ChannelsSelect`](ChannelsSelect.md)

## Properties

### response\_url\_enabled?

```ts
optional response_url_enabled: boolean;
```

#### Description

When set to `true`, the [`view_submission` payload](https://api.slack.com/reference/interaction-payloads/views#view_submission)
from the menu's parent view will contain a `response_url`. This `response_url` can be used for
[message responses](https://api.slack.com/interactivity/handling#message_responses). The target conversation
for the message will be determined by the value of this select menu.

#### Defined in

[block-kit/extensions.ts:67](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L67)
