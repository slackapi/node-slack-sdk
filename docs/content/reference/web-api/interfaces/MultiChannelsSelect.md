# Interface: MultiChannelsSelect

## Description

This multi-select menu will populate its options with a list of public channels visible to the current
user in the active workspace.

## See

 - [Multi-select menu of public channels reference](https://api.slack.com/reference/block-kit/block-elements#channel_multi_select).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).

## Extends

- [`Actionable`](Actionable.md).[`Confirmable`](Confirmable.md).[`Focusable`](Focusable.md).[`Placeholdable`](Placeholdable.md)

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

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:12

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

[`Focusable`](Focusable.md).[`focus_on_load`](Focusable.md#focus_on_load)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:29

***

### initial\_channels?

```ts
optional initial_channels: string[];
```

#### Description

An array of one or more IDs of any valid public channel to be pre-selected when the menu loads.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:382

***

### max\_selected\_items?

```ts
optional max_selected_items: number;
```

#### Description

Specifies the maximum number of items that can be selected in the menu. Minimum number is 1.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:386

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

packages/web-api/node\_modules/@slack/types/dist/block-kit/extensions.d.ts:36

***

### type

```ts
type: "multi_channels_select";
```

#### Description

The type of element. In this case `type` is always `multi_channels_select`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:378
