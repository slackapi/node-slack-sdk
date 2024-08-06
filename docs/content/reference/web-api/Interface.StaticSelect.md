# Interface: StaticSelect

## Description

This is the simplest form of select menu, with a static list of options passed in when defining the
element.

## See

 - [Select menu of static options reference](https://api.slack.com/reference/block-kit/block-elements#static_select).
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

### initial\_option?

```ts
optional initial_option: PlainTextOption;
```

#### Description

A single option that exactly matches one of the options within `options` or `option_groups`.
This option will be selected when the menu initially loads.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:225

***

### option\_groups?

```ts
optional option_groups: object[];
```

#### Description

An array of option group objects. Maximum number of option groups is 100. If `options` is specified,
this field should not be.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:235

***

### options?

```ts
optional options: PlainTextOption[];
```

#### Description

An array of [PlainTextOption](Interface.PlainTextOption.md). Maximum number of options is 100. If `option_groups` is
specified, this field should not be.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:230

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
type: "static_select";
```

#### Description

The type of element. In this case `type` is always `static_select`.

#### Overrides

[`Actionable`](Interface.Actionable.md).[`type`](Interface.Actionable.md#type)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:220
