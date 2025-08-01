[@slack/types](../index.md) / Select

# Type Alias: Select

```ts
type Select = 
  | UsersSelect
  | StaticSelect
  | ConversationsSelect
  | ChannelsSelect
  | ExternalSelect;
```

Defined in: [block-kit/block-elements.ts:194](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L194)

## Description

Allows users to choose an option from a drop down menu.
The select menu also includes type-ahead functionality, where a user can type a part or all of an option string to
filter the list. There are different types of select menu elements that depend on different data sources for their
lists of options: [StaticSelect](../interfaces/StaticSelect.md), [ExternalSelect](../interfaces/ExternalSelect.md), [UsersSelect](../interfaces/UsersSelect.md), [ConversationsSelect](../interfaces/ConversationsSelect.md),
[ChannelsSelect](../interfaces/ChannelsSelect.md).

## See

 - [Select menu element reference](https://docs.slack.dev/reference/block-kit/block-elements/select-menu-element).
 - [This is an interactive component - see our guide to enabling interactivity](https://docs.slack.dev/interactivity/handling-user-interaction).
