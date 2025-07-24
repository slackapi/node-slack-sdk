[@slack/web-api](../index.md) / MultiStaticSelect

# Interface: MultiStaticSelect

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:242

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

### initial\_options?

```ts
optional initial_options: PlainTextOption[];
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:251

#### Description

An array of option objects that exactly match one or more of the options within `options` or
`option_groups`. These options will be selected when the menu initially loads.

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

### option\_groups?

```ts
optional option_groups: object[];
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:261

#### label

```ts
label: PlainTextElement;
```

#### options

```ts
options: PlainTextOption[];
```

#### Description

An array of option group objects. Maximum number of option groups is 100. If `options` is specified,
this field should not be.

***

### options?

```ts
optional options: PlainTextOption[];
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:256

#### Description

An array of [PlainTextOption](PlainTextOption.md). Maximum number of options is 100. If `option_groups` is
specified, this field should not be.

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
type: "multi_static_select";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:246

#### Description

The type of element. In this case `type` is always `multi_static_select`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
