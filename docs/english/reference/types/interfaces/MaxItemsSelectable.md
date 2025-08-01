[@slack/types](../index.md) / MaxItemsSelectable

# Interface: MaxItemsSelectable

Defined in: [block-kit/extensions.ts:45](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L45)

## Extended by

- [`MultiUsersSelect`](MultiUsersSelect.md)
- [`MultiStaticSelect`](MultiStaticSelect.md)
- [`MultiConversationsSelect`](MultiConversationsSelect.md)
- [`MultiChannelsSelect`](MultiChannelsSelect.md)
- [`MultiExternalSelect`](MultiExternalSelect.md)

## Properties

### max\_selected\_items?

```ts
optional max_selected_items: number;
```

Defined in: [block-kit/extensions.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L49)

#### Description

Specifies the maximum number of items that can be selected. Minimum number is 1.
