[@slack/web-api](../index.md) / Select

# Type Alias: Select

```ts
type Select = 
  | UsersSelect
  | StaticSelect
  | ConversationsSelect
  | ChannelsSelect
  | ExternalSelect;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:162

## Description

Allows users to choose an option from a drop down menu.
The select menu also includes type-ahead functionality, where a user can type a part or all of an option string to
filter the list. There are different types of select menu elements that depend on different data sources for their
lists of options: [StaticSelect](../interfaces/StaticSelect.md), [ExternalSelect](../interfaces/ExternalSelect.md), [UsersSelect](../interfaces/UsersSelect.md), [ConversationsSelect](../interfaces/ConversationsSelect.md),
[ChannelsSelect](../interfaces/ChannelsSelect.md).

## See

 - [Select menu element reference](https://api.slack.com/reference/block-kit/block-elements#select).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).
