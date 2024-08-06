# Interface: MultiExternalSelect

## Description

This menu will load its options from an external data source, allowing for a dynamic list of options.

## See

 - [Multi-select menu of external data source reference](https://api.slack.com/reference/block-kit/block-elements#external_multi_select).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).

## Extends

- [`Actionable`](Interface.Actionable.md).[`Confirmable`](Interface.Confirmable.md).[`Focusable`](Interface.Focusable.md).[`Placeholdable`](Interface.Placeholdable.md)

## Properties

### action\_id?

```ts
optional action_id: string;
```

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Actionable`](Interface.Actionable.md).[`action_id`](Interface.Actionable.md#action_id)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:12

***

### confirm?

```ts
optional confirm: ConfirmationDialog;
```

#### Description

A [Confirm](Interface.Confirm.md) object that defines an optional confirmation dialog after the element is interacted
with.

#### Inherited from

[`Confirmable`](Interface.Confirmable.md).[`confirm`](Interface.Confirmable.md#confirm)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:21

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

[`Focusable`](Interface.Focusable.md).[`focus_on_load`](Interface.Focusable.md#focus_on_load)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:29

***

### initial\_options?

```ts
optional initial_options: PlainTextOption[];
```

#### Description

An array of options to be selected when the menu initially loads.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:423

***

### max\_selected\_items?

```ts
optional max_selected_items: number;
```

#### Description

Specifies the maximum number of items that can be selected in the menu. Minimum number is 1.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:433

***

### min\_query\_length?

```ts
optional min_query_length: number;
```

#### Description

When the typeahead field is used, a request will be sent on every character change. If you prefer
fewer requests or more fully ideated queries, use the `min_query_length` attribute to tell Slack the fewest number
of typed characters required before dispatch. The default value is `3`.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:429

***

### placeholder?

```ts
optional placeholder: PlainTextElement;
```

#### Description

A [PlainTextElement](Interface.PlainTextElement.md) object that defines the placeholder text shown on the element. Maximum
length for the `text` field in this object is 150 characters.

#### Inherited from

[`Placeholdable`](Interface.Placeholdable.md).[`placeholder`](Interface.Placeholdable.md#placeholder)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:36

***

### type

```ts
type: "multi_external_select";
```

#### Description

The type of element. In this case `type` is always `multi_external_select`.

#### Overrides

[`Actionable`](Interface.Actionable.md).[`type`](Interface.Actionable.md#type)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:419
