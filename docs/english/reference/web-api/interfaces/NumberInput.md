[@slack/web-api](../index.md) / NumberInput

# Interface: NumberInput

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:484

## Description

Allows user to enter a number into a single-line field. The number input element accepts both whole and
decimal numbers. For example, 0.25, 5.5, and -10 are all valid input values. Decimal numbers are only allowed when
`is_decimal_allowed` is equal to `true`.

## See

 - [Number input element reference](https://docs.slack.dev/reference/block-kit/block-elements/number-input-element).
 - [This is an interactive component - see our guide to enabling interactivity](https://docs.slack.dev/interactivity/handling-user-interaction).

## Extends

- [`Actionable`](Actionable.md).[`Dispatchable`](Dispatchable.md).[`Focusable`](Focusable.md).[`Placeholdable`](Placeholdable.md)

## Properties

### action\_id?

```ts
optional action_id: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:12

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Actionable`](Actionable.md).[`action_id`](Actionable.md#action_id)

***

### dispatch\_action\_config?

```ts
optional dispatch_action_config: DispatchActionConfig;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:28

#### Description

A [DispatchActionConfig](DispatchActionConfig.md) object that determines when during text input the element returns a
[\`block\_actions\` payload](https://docs.slack.dev/reference/interaction-payloads/block_actions-payload).

#### Inherited from

[`Dispatchable`](Dispatchable.md).[`dispatch_action_config`](Dispatchable.md#dispatch_action_config)

***

### focus\_on\_load?

```ts
optional focus_on_load: boolean;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:36

#### Description

Indicates whether the element will be set to auto focus within the
[\`view\` object](https://docs.slack.dev/surfaces/modals). Only one element can be set to `true`.
Defaults to `false`.

#### Inherited from

[`Focusable`](Focusable.md).[`focus_on_load`](Focusable.md#focus_on_load)

***

### initial\_value?

```ts
optional initial_value: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:496

#### Description

The initial value in the input when it is loaded.

***

### is\_decimal\_allowed

```ts
is_decimal_allowed: boolean;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:492

#### Description

Decimal numbers are allowed if this property is `true`, set the value to `false` otherwise.

***

### max\_value?

```ts
optional max_value: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:504

#### Description

The maximum value, cannot be less than `min_value`.

***

### min\_value?

```ts
optional min_value: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:500

#### Description

The minimum value, cannot be greater than `max_value`.

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
type: "number_input";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:488

#### Description

The type of element. In this case `type` is always `number_input`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
