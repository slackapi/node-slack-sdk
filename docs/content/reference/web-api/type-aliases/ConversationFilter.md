[@slack/web-api](../index.md) / ConversationFilter

# Type Alias: ConversationFilter

```ts
type ConversationFilter = 
  | BaseConversationFilter & Required<Pick<BaseConversationFilter, "include">>
  | BaseConversationFilter & Required<Pick<BaseConversationFilter, "exclude_bot_users">>
| BaseConversationFilter & Required<Pick<BaseConversationFilter, "exclude_external_shared_channels">>;
```

Defined in: node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:183

## Description

Defines a filter for the list of options in a conversation selector menu. The menu can be either a
conversations select menu or a conversations multi-select menu.

## See

[Conversation filter object reference](https://api.slack.com/reference/block-kit/composition-objects#filter_conversations).
