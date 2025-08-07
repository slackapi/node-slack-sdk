[@slack/types](../index.md) / MultiSelect

# Type Alias: MultiSelect

```ts
type MultiSelect = 
  | MultiUsersSelect
  | MultiStaticSelect
  | MultiConversationsSelect
  | MultiChannelsSelect
  | MultiExternalSelect;
```

Defined in: [block-kit/block-elements.ts:206](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L206)

## Description

Allows users to select multiple items from a list of options.
Just like regular [Select](Select.md), multi-select menus also include type-ahead functionality, where a user can type a
part or all of an option string to filter the list.
There are different types of multi-select menu that depend on different data sources for their lists of options:
[MultiStaticSelect](../interfaces/MultiStaticSelect.md), [MultiExternalSelect](../interfaces/MultiExternalSelect.md), [MultiUsersSelect](../interfaces/MultiUsersSelect.md), [MultiConversationsSelect](../interfaces/MultiConversationsSelect.md),
[MultiChannelsSelect](../interfaces/MultiChannelsSelect.md).

## See

 - [Multi-select menu element reference](https://docs.slack.dev/reference/block-kit/block-elements/multi-select-menus-element).
 - [This is an interactive component - see our guide to enabling interactivity](https://docs.slack.dev/interactivity/handling-user-interaction).
