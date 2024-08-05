# Interface: ChannelsSelect

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

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Actionable`](Actionable.md).[`action_id`](Actionable.md#action_id)

#### Defined in

[block-kit/extensions.ts:15](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/extensions.ts#L15)

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

[block-kit/extensions.ts:25](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/extensions.ts#L25)

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

[block-kit/extensions.ts:42](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/extensions.ts#L42)

***

### initial\_channel?

```ts
optional initial_channel: string;
```

#### Description

The ID of any valid public channel to be pre-selected when the menu loads.

#### Defined in

[block-kit/block-elements.ts:448](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/block-elements.ts#L448)

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

[block-kit/extensions.ts:57](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/extensions.ts#L57)

***

### response\_url\_enabled?

```ts
optional response_url_enabled: boolean;
```

#### Description

When set to `true`, the [`view_submission` payload](https://api.slack.com/reference/interaction-payloads/views#view_submission)
from the menu's parent view will contain a `response_url`. This `response_url` can be used for
[message responses](https://api.slack.com/interactivity/handling#message_responses). The target conversation
for the message will be determined by the value of this select menu.

#### Inherited from

[`URLRespondable`](URLRespondable.md).[`response_url_enabled`](URLRespondable.md#response_url_enabled)

#### Defined in

[block-kit/extensions.ts:67](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/extensions.ts#L67)

***

### type

```ts
type: "channels_select";
```

#### Description

The type of element. In this case `type` is always `channels_select`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)

#### Defined in

[block-kit/block-elements.ts:444](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/block-elements.ts#L444)
