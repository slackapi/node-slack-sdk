# Interface: ConversationsSelect

## Description

This select menu will populate its options with a list of public and private channels, DMs, and MPIMs
visible to the current user in the active workspace.

## See

 - [Select menu of conversations reference](https://api.slack.com/reference/block-kit/block-elements#conversations_select).
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

### default\_to\_current\_conversation?

```ts
optional default_to_current_conversation: boolean;
```

#### Description

Pre-populates the select menu with the conversation that the user was viewing when they opened the
modal, if available. Default is `false`.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:301

***

### filter?

```ts
optional filter: object;
```

#### exclude\_bot\_users?

```ts
optional exclude_bot_users: boolean;
```

#### exclude\_external\_shared\_channels?

```ts
optional exclude_external_shared_channels: boolean;
```

#### include?

```ts
optional include: ("im" | "mpim" | "private" | "public")[];
```

#### Description

A filter object that reduces the list of available conversations using the specified criteria.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:305

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

### initial\_conversation?

```ts
optional initial_conversation: string;
```

#### Description

The ID of any valid conversation to be pre-selected when the menu loads. If
`default_to_current_conversation` is also supplied, `initial_conversation` will take precedence.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:289

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

### response\_url\_enabled?

```ts
optional response_url_enabled: boolean;
```

#### Description

When set to `true`, the [`view_submission` payload](https://api.slack.com/reference/interaction-payloads/views#view_submission)
from the menu's parent view will contain a `response_url`. This `response_url` can be used for
[message responses](https://api.slack.com/interactivity/handling#message_responses). The target conversation
for the message will be determined by the value of this select menu.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:296

***

### type

```ts
type: "conversations_select";
```

#### Description

The type of element. In this case `type` is always `conversations_select`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:284
