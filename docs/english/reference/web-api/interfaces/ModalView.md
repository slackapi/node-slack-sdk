[@slack/web-api](../index.md) / ModalView

# Interface: ModalView

Defined in: node\_modules/@slack/types/dist/views.d.ts:26

## Extends

- `BaseView`

## Properties

### blocks

```ts
blocks: AnyBlock[];
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:5

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

Defined in: node\_modules/@slack/types/dist/views.d.ts:18

#### Description

An identifier to recognize interactions and submissions of this particular view. Don't use this to
store sensitive information (use `private_metadata` instead). Maximum length of 255 characters.

#### See

[Handling and responding to interactions](https://api.slack.com/surfaces/modals#interactions).

#### Inherited from

```ts
BaseView.callback_id
```

***

### clear\_on\_close?

```ts
optional clear_on_close: boolean;
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:49

#### Description

When set to `true`, clicking on the close button will clear all views in a modal and close it.
Defaults to `false`.

***

### close?

```ts
optional close: PlainTextElement;
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:38

#### Description

An optional [PlainTextElement](PlainTextElement.md) that defines the text displayed in the close button at the
bottom-right of the view. Maximum length of 24 characters.

***

### external\_id?

```ts
optional external_id: string;
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:20

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

Defined in: node\_modules/@slack/types/dist/views.d.ts:55

#### Description

Indicates whether Slack will send your app a
[\`view\_closed\`](https://api.slack.com/reference/interaction-payloads/views#view_closed) event when a user
clicks the close button. Defaults to `false`.

***

### private\_metadata?

```ts
optional private_metadata: string;
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:12

#### Description

String that will be sent to your app in
[\`view\_submission\`](https://api.slack.com/reference/interaction-payloads/views#view_submission) and
[\`block\_actions\`](https://api.slack.com/reference/interaction-payloads/block-actions) events.
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

Defined in: node\_modules/@slack/types/dist/views.d.ts:44

#### Description

An optional [PlainTextElement](PlainTextElement.md) that defines the text displayed in the submit button at the
bottom-right of the view. `submit` is required when an input block is within the `blocks` array. Max length of 24
characters.

***

### title

```ts
title: PlainTextElement;
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:33

#### Description

The title that appears in the top-left of the modal. Must be a [PlainTextElement](PlainTextElement.md) with a
maximum length of 24 characters.

***

### type

```ts
type: "modal";
```

Defined in: node\_modules/@slack/types/dist/views.d.ts:28

#### Description

The type of view. Set to `modal` for modals.
