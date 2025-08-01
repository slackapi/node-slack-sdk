[@slack/web-api](../index.md) / StaticSelect

# Interface: StaticSelect

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:212

## Description

This is the simplest form of select menu, with a static list of options passed in when defining the
element.

## See

 - [Select menu of static options reference](https://api.slack.com/reference/block-kit/block-elements#static_select).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).

## Extends

- [`Actionable`](Actionable.md).[`Confirmable`](Confirmable.md).[`Focusable`](Focusable.md).[`Placeholdable`](Placeholdable.md)

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

### initial\_option?

```ts
optional initial_option: PlainTextOption;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:221

#### Description

A single option that exactly matches one of the options within `options` or `option_groups`.
This option will be selected when the menu initially loads.

***

### option\_groups?

```ts
optional option_groups: object[];
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:231

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

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:226

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
type: "static_select";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:216

#### Description

The type of element. In this case `type` is always `static_select`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
