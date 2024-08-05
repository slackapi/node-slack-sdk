# Interface: ModalView

## Extends

- `BaseView`

## Properties

### blocks

```ts
blocks: AnyBlock[];
```

#### Description

An array of [AnyBlock](../type-aliases/AnyBlock.md) that defines the content of the view. Max of 100 blocks.

#### Inherited from

`BaseView.blocks`

#### Defined in

[views.ts:6](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/views.ts#L6)

***

### callback\_id?

```ts
optional callback_id: string;
```

#### Description

An identifier to recognize interactions and submissions of this particular view. Don't use this to
store sensitive information (use `private_metadata` instead). Maximum length of 255 characters.

#### See

[Handling and responding to interactions](https://api.slack.com/surfaces/modals#interactions).

#### Inherited from

`BaseView.callback_id`

#### Defined in

[views.ts:19](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/views.ts#L19)

***

### clear\_on\_close?

```ts
optional clear_on_close: boolean;
```

#### Description

When set to `true`, clicking on the close button will clear all views in a modal and close it.
Defaults to `false`.

#### Defined in

[views.ts:54](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/views.ts#L54)

***

### close?

```ts
optional close: PlainTextElement;
```

#### Description

An optional [PlainTextElement](PlainTextElement.md) that defines the text displayed in the close button at the
bottom-right of the view. Maximum length of 24 characters.

#### Defined in

[views.ts:43](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/views.ts#L43)

***

### external\_id?

```ts
optional external_id: string;
```

#### Description

A custom identifier that must be unique for all views on a per-team basis.

#### Inherited from

`BaseView.external_id`

#### Defined in

[views.ts:21](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/views.ts#L21)

***

### notify\_on\_close?

```ts
optional notify_on_close: boolean;
```

#### Description

Indicates whether Slack will send your app a
[`view_closed`](https://api.slack.com/reference/interaction-payloads/views#view_closed) event when a user
clicks the close button. Defaults to `false`.

#### Defined in

[views.ts:60](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/views.ts#L60)

***

### private\_metadata?

```ts
optional private_metadata: string;
```

#### Description

String that will be sent to your app in
[`view_submission`](https://api.slack.com/reference/interaction-payloads/views#view_submission) and
[`block_actions`](https://api.slack.com/reference/interaction-payloads/block-actions) events.
Maximum length of 3000 characters.

#### Inherited from

`BaseView.private_metadata`

#### Defined in

[views.ts:13](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/views.ts#L13)

***

### submit?

```ts
optional submit: PlainTextElement;
```

#### Description

An optional [PlainTextElement](PlainTextElement.md) that defines the text displayed in the submit button at the
bottom-right of the view. `submit` is required when an input block is within the `blocks` array. Max length of 24
characters.

#### Defined in

[views.ts:49](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/views.ts#L49)

***

### title

```ts
title: PlainTextElement;
```

#### Description

The title that appears in the top-left of the modal. Must be a [PlainTextElement](PlainTextElement.md) with a
maximum length of 24 characters.

#### Defined in

[views.ts:38](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/views.ts#L38)

***

### type

```ts
type: "modal";
```

#### Description

The type of view. Set to `modal` for modals.

#### Defined in

[views.ts:33](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/views.ts#L33)
