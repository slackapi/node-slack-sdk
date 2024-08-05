# Type Alias: MultiSelect

```ts
type MultiSelect: 
  | MultiUsersSelect
  | MultiStaticSelect
  | MultiConversationsSelect
  | MultiChannelsSelect
  | MultiExternalSelect;
```

## Description

Allows users to select multiple items from a list of options.
Just like regular [Select](Select.md), multi-select menus also include type-ahead functionality, where a user can type a
part or all of an option string to filter the list.
There are different types of multi-select menu that depend on different data sources for their lists of options:
[MultiStaticSelect](../interfaces/MultiStaticSelect.md), [MultiExternalSelect](../interfaces/MultiExternalSelect.md), [MultiUsersSelect](../interfaces/MultiUsersSelect.md), [MultiConversationsSelect](../interfaces/MultiConversationsSelect.md),
[MultiChannelsSelect](../interfaces/MultiChannelsSelect.md).

## See

 - [Multi-select menu element reference](https://api.slack.com/reference/block-kit/block-elements#multi_select).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).

## Defined in

[block-kit/block-elements.ts:219](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/block-elements.ts#L219)
