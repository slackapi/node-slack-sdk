[@slack/web-api](../index.md) / MultiExternalSelect

# Interface: MultiExternalSelect

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:385

## Description

This menu will load its options from an external data source, allowing for a dynamic list of options.

## See

 - [Multi-select menu of external data source reference](https://api.slack.com/reference/block-kit/block-elements#external_multi_select).
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

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:393

#### Description

An array of options to be selected when the menu initially loads.

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

### min\_query\_length?

```ts
optional min_query_length: number;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:399

#### Description

When the typeahead field is used, a request will be sent on every character change. If you prefer
fewer requests or more fully ideated queries, use the `min_query_length` attribute to tell Slack the fewest number
of typed characters required before dispatch. The default value is `3`.

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
type: "multi_external_select";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:389

#### Description

The type of element. In this case `type` is always `multi_external_select`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
