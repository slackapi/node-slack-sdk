[@slack/web-api](../index.md) / InputBlock

# Interface: InputBlock

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:146

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

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:15

#### Description

A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
You can use this `block_id` when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

***

### dispatch\_action?

```ts
optional dispatch_action: boolean;
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:174

#### Description

A boolean that indicates whether or not the use of elements in this block should dispatch a
[block\_actions payload](https://api.slack.com/reference/interaction-payloads/block-actions). Defaults to `false`.

***

### element

```ts
element: InputBlockElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:169

#### Description

A block element.

***

### hint?

```ts
optional hint: PlainTextElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:160

#### Description

An optional hint that appears below an input element in a lighter grey. It must be a
[object](PlainTextElement.md). Maximum length for the `text` in this field is 2000 characters.

***

### label

```ts
label: PlainTextElement;
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:155

#### Description

A label that appears above an input element in the form of a [PlainTextElement](PlainTextElement.md) object.
Maximum length for the text in this field is 2000 characters.

***

### optional?

```ts
optional optional: boolean;
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:165

#### Description

A boolean that indicates whether the input element may be empty when a user submits the modal.
Defaults to `false`.

***

### type

```ts
type: "input";
```

Defined in: node\_modules/@slack/types/dist/block-kit/blocks.d.ts:150

#### Description

The type of block. For an input block, `type` is always `input`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
