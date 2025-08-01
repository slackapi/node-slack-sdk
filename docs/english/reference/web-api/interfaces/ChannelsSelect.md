[@slack/web-api](../index.md) / ChannelsSelect

# Interface: ChannelsSelect

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:332

## Description

This select menu will populate its options with a list of public channels visible to the current user
in the active workspace.

## See

 - [Select menu of public channels reference](https://api.slack.com/reference/block-kit/block-elements#channels_select).
 - [This is an interactive component - see our guide to enabling interactivity](https://api.slack.com/interactivity/handling).

## Extends

- [`Actionable`](Actionable.md).[`Confirmable`](Confirmable.md).[`Focusable`](Focusable.md).[`Placeholdable`](Placeholdable.md).[`URLRespondable`](URLRespondable.md)

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

### initial\_channel?

```ts
optional initial_channel: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:340

#### Description

The ID of any valid public channel to be pre-selected when the menu loads.

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

### response\_url\_enabled?

```ts
optional response_url_enabled: boolean;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:58

#### Description

When set to `true`, the [\`view\_submission\` payload](https://api.slack.com/reference/interaction-payloads/views#view_submission)
from the menu's parent view will contain a `response_url`. This `response_url` can be used for
[message responses](https://api.slack.com/interactivity/handling#message_responses). The target conversation
for the message will be determined by the value of this select menu.

#### Inherited from

[`URLRespondable`](URLRespondable.md).[`response_url_enabled`](URLRespondable.md#response_url_enabled)

***

### type

```ts
type: "channels_select";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:336

#### Description

The type of element. In this case `type` is always `channels_select`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
