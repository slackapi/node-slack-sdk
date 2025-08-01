[@slack/web-api](../index.md) / MultiUsersSelect

# Interface: MultiUsersSelect

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:196

## Description

This multi-select menu will populate its options with a list of Slack users visible to the current user
in the active workspace.

## See

 - [Multi-select menu of users reference](https://api.slack.com/reference/block-kit/block-elements#users_multi_select).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).

## Extends

- [`Actionable`](Actionable.md).[`Confirmable`](Confirmable.md).[`Focusable`](Focusable.md).[`MaxItemsSelectable`](MaxItemsSelectable.md).[`Placeholdable`](Placeholdable.md)

## Properties

### action\_id?

```ts
optional action_id: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:12

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Actionable`](Actionable.md).[`action_id`](Actionable.md#action_id)

***

### confirm?

```ts
optional confirm: ConfirmationDialog;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:21

#### Description

A [Confirm](Confirm.md) object that defines an optional confirmation dialog after the element is interacted
with.

#### Inherited from

[`Confirmable`](Confirmable.md).[`confirm`](Confirmable.md#confirm)

***

### focus\_on\_load?

```ts
optional focus_on_load: boolean;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:36

#### Description

Indicates whether the element will be set to auto focus within the
[\`view\` object](https://api.slack.com/reference/surfaces/views). Only one element can be set to `true`.
Defaults to `false`.

#### Inherited from

[`Focusable`](Focusable.md).[`focus_on_load`](Focusable.md#focus_on_load)

***

### initial\_users?

```ts
optional initial_users: string[];
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:204

#### Description

An array of user IDs of any valid users to be pre-selected when the menu loads.

***

### max\_selected\_items?

```ts
optional max_selected_items: number;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:42

#### Description

Specifies the maximum number of items that can be selected. Minimum number is 1.

#### Inherited from

[`MaxItemsSelectable`](MaxItemsSelectable.md).[`max_selected_items`](MaxItemsSelectable.md#max_selected_items)

***

### placeholder?

```ts
optional placeholder: PlainTextElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:49

#### Description

A [PlainTextElement](PlainTextElement.md) object that defines the placeholder text shown on the element. Maximum
length for the `text` field in this object is 150 characters.

#### Inherited from

[`Placeholdable`](Placeholdable.md).[`placeholder`](Placeholdable.md#placeholder)

***

### type

```ts
type: "multi_users_select";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:200

#### Description

The type of element. In this case `type` is always `multi_users_select`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
