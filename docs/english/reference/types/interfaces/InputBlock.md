[@slack/types](../index.md) / InputBlock

# Interface: InputBlock

Defined in: [block-kit/blocks.ts:218](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L218)

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

Defined in: [block-kit/blocks.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L39)

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

Defined in: [block-kit/blocks.ts:246](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L246)

#### Description

A boolean that indicates whether or not the use of elements in this block should dispatch a
[block\_actions payload](https://docs.slack.dev/reference/interaction-payloads/block_actions-payload). Defaults to `false`.

***

### element

```ts
element: InputBlockElement;
```

Defined in: [block-kit/blocks.ts:241](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L241)

#### Description

A block element.

***

### hint?

```ts
optional hint: PlainTextElement;
```

Defined in: [block-kit/blocks.ts:232](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L232)

#### Description

An optional hint that appears below an input element in a lighter grey. It must be a
[object](PlainTextElement.md). Maximum length for the `text` in this field is 2000 characters.

***

### label

```ts
label: PlainTextElement;
```

Defined in: [block-kit/blocks.ts:227](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L227)

#### Description

A label that appears above an input element in the form of a [PlainTextElement](PlainTextElement.md) object.
Maximum length for the text in this field is 2000 characters.

***

### optional?

```ts
optional optional: boolean;
```

Defined in: [block-kit/blocks.ts:237](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L237)

#### Description

A boolean that indicates whether the input element may be empty when a user submits the modal.
Defaults to `false`.

***

### type

```ts
type: "input";
```

Defined in: [block-kit/blocks.ts:222](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L222)

#### Description

The type of block. For an input block, `type` is always `input`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
