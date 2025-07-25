[@slack/types](../index.md) / MultiConversationsSelect

# Interface: MultiConversationsSelect

Defined in: [block-kit/block-elements.ts:361](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L361)

## Description

This multi-select menu will populate its options with a list of public and private channels, DMs, and
MPIMs visible to the current user in the active workspace.

## See

 - [Multi-select menu of conversations reference](https://docs.slack.dev/reference/block-kit/block-elements/multi-select-menu-element#conversation_multi_select).
 - [This is an interactive component - see our guide to enabling interactivity](https://docs.slack.dev/interactivity/handling-user-interaction).

## Extends

- [`Actionable`](Actionable.md).[`Confirmable`](Confirmable.md).[`Focusable`](Focusable.md).[`MaxItemsSelectable`](MaxItemsSelectable.md).[`Placeholdable`](Placeholdable.md)

## Properties

### action\_id?

```ts
optional action_id: string;
```

Defined in: [block-kit/extensions.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L15)

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Actionable`](Actionable.md).[`action_id`](Actionable.md#action_id)

***

### confirm?

```ts
optional confirm: ConfirmationDialog;
```

Defined in: [block-kit/extensions.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L25)

#### Description

A [Confirm](Confirm.md) object that defines an optional confirmation dialog after the element is interacted
with.

#### Inherited from

[`Confirmable`](Confirmable.md).[`confirm`](Confirmable.md#confirm)

***

### default\_to\_current\_conversation?

```ts
optional default_to_current_conversation: boolean;
```

Defined in: [block-kit/block-elements.ts:381](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L381)

#### Description

Pre-populates the select menu with the conversation that the user was viewing when they opened the
modal, if available. Default is `false`.

***

### filter?

```ts
optional filter: object;
```

Defined in: [block-kit/block-elements.ts:385](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L385)

#### exclude\_bot\_users?

```ts
optional exclude_bot_users: boolean;
```

#### exclude\_external\_shared\_channels?

```ts
optional exclude_external_shared_channels: boolean;
```

#### include?

```ts
optional include: ("im" | "mpim" | "private" | "public")[];
```

#### Description

A filter object that reduces the list of available conversations using the specified criteria.

***

### focus\_on\_load?

```ts
optional focus_on_load: boolean;
```

Defined in: [block-kit/extensions.ts:42](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L42)

#### Description

Indicates whether the element will be set to auto focus within the
[\`view\` object](https://docs.slack.dev/surfaces/modals). Only one element can be set to `true`.
Defaults to `false`.

#### Inherited from

[`Focusable`](Focusable.md).[`focus_on_load`](Focusable.md#focus_on_load)

***

### initial\_conversations?

```ts
optional initial_conversations: string[];
```

Defined in: [block-kit/block-elements.ts:376](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L376)

#### Description

An array of one or more IDs of any valid conversations to be pre-selected when the menu loads. If
`default_to_current_conversation` is also supplied, `initial_conversation` will be ignored.

***

### max\_selected\_items?

```ts
optional max_selected_items: number;
```

Defined in: [block-kit/extensions.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L49)

#### Description

Specifies the maximum number of items that can be selected. Minimum number is 1.

#### Inherited from

[`MaxItemsSelectable`](MaxItemsSelectable.md).[`max_selected_items`](MaxItemsSelectable.md#max_selected_items)

***

### placeholder?

```ts
optional placeholder: PlainTextElement;
```

Defined in: [block-kit/extensions.ts:57](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L57)

#### Description

A [PlainTextElement](PlainTextElement.md) object that defines the placeholder text shown on the element. Maximum
length for the `text` field in this object is 150 characters.

#### Inherited from

[`Placeholdable`](Placeholdable.md).[`placeholder`](Placeholdable.md#placeholder)

***

### type

```ts
type: "multi_conversations_select";
```

Defined in: [block-kit/block-elements.ts:370](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L370)

#### Description

The type of element. In this case `type` is always `conversations_select`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
