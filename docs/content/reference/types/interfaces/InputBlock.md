# Interface: InputBlock

## Description

Collects information from users via block elements.

## See

 - [Input block reference](https://api.slack.com/reference/block-kit/blocks#input).
 - [Collecting input in modals guide](https://api.slack.com/surfaces/modals#gathering_input).
 - [Collecting input in Home tabs guide](https://api.slack.com/surfaces/app-home#gathering_input).

## Extends

- [`Block`](Block.md)

## Properties

### block\_id?

```ts
optional block_id: string;
```

#### Description

A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
You can use this `block_id` when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

#### Defined in

[block-kit/blocks.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L44)

***

### dispatch\_action?

```ts
optional dispatch_action: boolean;
```

#### Description

A boolean that indicates whether or not the use of elements in this block should dispatch a
[block_actions payload](https://api.slack.com/reference/interaction-payloads/block-actions). Defaults to `false`.

#### Defined in

[block-kit/blocks.ts:218](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L218)

***

### element

```ts
element: InputBlockElement;
```

#### Description

A block element.

#### Defined in

[block-kit/blocks.ts:213](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L213)

***

### hint?

```ts
optional hint: PlainTextElement;
```

#### Description

An optional hint that appears below an input element in a lighter grey. It must be a
[object](PlainTextElement.md). Maximum length for the `text` in this field is 2000 characters.

#### Defined in

[block-kit/blocks.ts:204](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L204)

***

### label

```ts
label: PlainTextElement;
```

#### Description

A label that appears above an input element in the form of a [PlainTextElement](PlainTextElement.md) object.
Maximum length for the text in this field is 2000 characters.

#### Defined in

[block-kit/blocks.ts:199](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L199)

***

### optional?

```ts
optional optional: boolean;
```

#### Description

A boolean that indicates whether the input element may be empty when a user submits the modal.
Defaults to `false`.

#### Defined in

[block-kit/blocks.ts:209](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L209)

***

### type

```ts
type: "input";
```

#### Description

The type of block. For an input block, `type` is always `input`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)

#### Defined in

[block-kit/blocks.ts:194](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L194)
