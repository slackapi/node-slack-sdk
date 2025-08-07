[@slack/web-api](../index.md) / PlainTextInput

# Interface: PlainTextInput

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:454

## Description

Allows users to enter freeform text data into a single-line or multi-line field.

## See

 - [Plain-text input element reference](https://api.slack.com/reference/block-kit/block-elements#input).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).

## Extends

- [`Actionable`](Actionable.md).[`Dispatchable`](Dispatchable.md).[`Focusable`](Focusable.md).[`Placeholdable`](Placeholdable.md)

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

### dispatch\_action\_config?

```ts
optional dispatch_action_config: DispatchActionConfig;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:28

#### Description

A [DispatchActionConfig](DispatchActionConfig.md) object that determines when during text input the element returns a
[\`block\_actions\` payload](https://api.slack.com/reference/interaction-payloads/block-actions).

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
[\`view\` object](https://api.slack.com/reference/surfaces/views). Only one element can be set to `true`.
Defaults to `false`.

#### Inherited from

[`Focusable`](Focusable.md).[`focus_on_load`](Focusable.md#focus_on_load)

***

### initial\_value?

```ts
optional initial_value: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:462

#### Description

The initial value in the plain-text input when it is loaded.

***

### max\_length?

```ts
optional max_length: number;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:477

#### Description

The maximum length of input that the user can provide. If the user provides more,
they will receive an error.

***

### min\_length?

```ts
optional min_length: number;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:472

#### Description

The minimum length of input that the user must provide. If the user provides less, they will receive
an error. Maximum value is 3000.

***

### multiline?

```ts
optional multiline: boolean;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:467

#### Description

Indicates whether the input will be a single line (`false`) or a larger textarea (`true`).
Defaults to `false`.

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
type: "plain_text_input";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:458

#### Description

The type of element. In this case `type` is always `plain_text_input`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
