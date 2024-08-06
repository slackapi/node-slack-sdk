# Interface: MultiStaticSelect

## Description

This is the simplest form of select menu, with a static list of options passed in when defining the
element.

## See

 - [Multi-select menu of static options reference](https://api.slack.com/reference/block-kit/block-elements#static_multi_select).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).

## Extends

- [`Actionable`](Actionable.md).[`Confirmable`](Confirmable.md).[`Focusable`](Focusable.md).[`MaxItemsSelectable`](MaxItemsSelectable.md).[`Placeholdable`](Placeholdable.md)

## Properties

### action\_id?

```ts
optional action_id: string;
```

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Actionable`](Actionable.md).[`action_id`](Actionable.md#action_id)

#### Defined in

[block-kit/extensions.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L15)

***

### confirm?

```ts
optional confirm: ConfirmationDialog;
```

#### Description

A [Confirm](Confirm.md) object that defines an optional confirmation dialog after the element is interacted
with.

#### Inherited from

[`Confirmable`](Confirmable.md).[`confirm`](Confirmable.md#confirm)

#### Defined in

[block-kit/extensions.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L25)

***

### focus\_on\_load?

```ts
optional focus_on_load: boolean;
```

#### Description

Indicates whether the element will be set to auto focus within the
[`view` object](https://api.slack.com/reference/surfaces/views). Only one element can be set to `true`.
Defaults to `false`.

#### Inherited from

[`Focusable`](Focusable.md).[`focus_on_load`](Focusable.md#focus_on_load)

#### Defined in

[block-kit/extensions.ts:42](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L42)

***

### initial\_options?

```ts
optional initial_options: PlainTextOption[];
```

#### Description

An array of option objects that exactly match one or more of the options within `options` or
`option_groups`. These options will be selected when the menu initially loads.

#### Defined in

[block-kit/block-elements.ts:331](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L331)

***

### max\_selected\_items?

```ts
optional max_selected_items: number;
```

#### Description

Specifies the maximum number of items that can be selected. Minimum number is 1.

#### Inherited from

[`MaxItemsSelectable`](MaxItemsSelectable.md).[`max_selected_items`](MaxItemsSelectable.md#max_selected_items)

#### Defined in

[block-kit/extensions.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L49)

***

### option\_groups?

```ts
optional option_groups: object[];
```

#### Description

An array of option group objects. Maximum number of option groups is 100. If `options` is specified,
this field should not be.

#### Defined in

[block-kit/block-elements.ts:346](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L346)

***

### options?

```ts
optional options: PlainTextOption[];
```

#### Description

An array of [PlainTextOption](PlainTextOption.md). Maximum number of options is 100. If `option_groups` is
specified, this field should not be.

#### Defined in

[block-kit/block-elements.ts:338](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L338)

***

### placeholder?

```ts
optional placeholder: PlainTextElement;
```

#### Description

A [PlainTextElement](PlainTextElement.md) object that defines the placeholder text shown on the element. Maximum
length for the `text` field in this object is 150 characters.

#### Inherited from

[`Placeholdable`](Placeholdable.md).[`placeholder`](Placeholdable.md#placeholder)

#### Defined in

[block-kit/extensions.ts:57](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L57)

***

### type

```ts
type: "multi_static_select";
```

#### Description

The type of element. In this case `type` is always `multi_static_select`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)

#### Defined in

[block-kit/block-elements.ts:325](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L325)
