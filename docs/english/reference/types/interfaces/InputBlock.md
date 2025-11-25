[@slack/types](../index.md) / InputBlock

# Interface: InputBlock

Defined in: [block-kit/blocks.ts:248](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L248)

## Description

Collects information from users via block elements.

## See

 - [Input block reference](https://docs.slack.dev/reference/block-kit/blocks/input-block).
 - [Collecting input in modals guide](https://docs.slack.dev/surfaces/modals#gathering_input).
 - [Collecting input in Home tabs guide](https://docs.slack.dev/surfaces/app-home).

## Extends

- [`Block`](Block.md)

## Properties

### block\_id?

```ts
optional block_id: string;
```

Defined in: [block-kit/blocks.ts:47](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L47)

#### Description

A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
You can use this `block_id` when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

***

### dispatch\_action?

```ts
optional dispatch_action: boolean;
```

Defined in: [block-kit/blocks.ts:276](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L276)

#### Description

A boolean that indicates whether or not the use of elements in this block should dispatch a
[block\_actions payload](https://docs.slack.dev/reference/interaction-payloads/block_actions-payload). Defaults to `false`.

***

### element

```ts
element: InputBlockElement;
```

Defined in: [block-kit/blocks.ts:271](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L271)

#### Description

A block element.

***

### hint?

```ts
optional hint: PlainTextElement;
```

Defined in: [block-kit/blocks.ts:262](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L262)

#### Description

An optional hint that appears below an input element in a lighter grey. It must be a
[object](PlainTextElement.md). Maximum length for the `text` in this field is 2000 characters.

***

### label

```ts
label: PlainTextElement;
```

Defined in: [block-kit/blocks.ts:257](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L257)

#### Description

A label that appears above an input element in the form of a [PlainTextElement](PlainTextElement.md) object.
Maximum length for the text in this field is 2000 characters.

***

### optional?

```ts
optional optional: boolean;
```

Defined in: [block-kit/blocks.ts:267](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L267)

#### Description

A boolean that indicates whether the input element may be empty when a user submits the modal.
Defaults to `false`.

***

### type

```ts
type: "input";
```

Defined in: [block-kit/blocks.ts:252](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L252)

#### Description

The type of block. For an input block, `type` is always `input`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
