[@slack/types](../index.md) / ModalView

# Interface: ModalView

Defined in: [views.ts:31](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L31)

## Extends

- `BaseView`

## Properties

### blocks

```ts
blocks: AnyBlock[];
```

Defined in: [views.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L6)

#### Description

An array of [AnyBlock](../type-aliases/AnyBlock.md) that defines the content of the view. Max of 100 blocks.

#### Inherited from

```ts
BaseView.blocks
```

***

### callback\_id?

```ts
optional callback_id: string;
```

Defined in: [views.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L19)

#### Description

An identifier to recognize interactions and submissions of this particular view. Don't use this to
store sensitive information (use `private_metadata` instead). Maximum length of 255 characters.

#### See

[Handling and responding to interactions](https://docs.slack.dev/surfaces/modals#interactions).

#### Inherited from

```ts
BaseView.callback_id
```

***

### clear\_on\_close?

```ts
optional clear_on_close: boolean;
```

Defined in: [views.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L54)

#### Description

When set to `true`, clicking on the close button will clear all views in a modal and close it.
Defaults to `false`.

***

### close?

```ts
optional close: PlainTextElement;
```

Defined in: [views.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L43)

#### Description

An optional [PlainTextElement](PlainTextElement.md) that defines the text displayed in the close button at the
bottom-right of the view. Maximum length of 24 characters.

***

### external\_id?

```ts
optional external_id: string;
```

Defined in: [views.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L21)

#### Description

A custom identifier that must be unique for all views on a per-team basis.

#### Inherited from

```ts
BaseView.external_id
```

***

### notify\_on\_close?

```ts
optional notify_on_close: boolean;
```

Defined in: [views.ts:60](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L60)

#### Description

Indicates whether Slack will send your app a
[\`view\_closed\`](https://docs.slack.dev/reference/interaction-payloads/view-interactions-payload#view_closed) event when a user
clicks the close button. Defaults to `false`.

***

### private\_metadata?

```ts
optional private_metadata: string;
```

Defined in: [views.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L13)

#### Description

String that will be sent to your app in
[\`view\_submission\`](https://docs.slack.dev/reference/interaction-payloads/view-interactions-payload#view_submission) and
[\`block\_actions\`](https://docs.slack.dev/reference/interaction-payloads/block_actions-payload) events.
Maximum length of 3000 characters.

#### Inherited from

```ts
BaseView.private_metadata
```

***

### submit?

```ts
optional submit: PlainTextElement;
```

Defined in: [views.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L49)

#### Description

An optional [PlainTextElement](PlainTextElement.md) that defines the text displayed in the submit button at the
bottom-right of the view. `submit` is required when an input block is within the `blocks` array. Max length of 24
characters.

***

### title

```ts
title: PlainTextElement;
```

Defined in: [views.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L38)

#### Description

The title that appears in the top-left of the modal. Must be a [PlainTextElement](PlainTextElement.md) with a
maximum length of 24 characters.

***

### type

```ts
type: "modal";
```

Defined in: [views.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/views.ts#L33)

#### Description

The type of view. Set to `modal` for modals.
