# Interface: ActionsBlock

## Description

Holds multiple interactive elements.

## See

[Actions block reference](https://api.slack.com/reference/block-kit/blocks#actions).

## Extends

- [`Block`](Interface.Block.md)

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

[`Block`](Interface.Block.md).[`block_id`](Interface.Block.md#block_id)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:13

***

### elements

```ts
elements: (
  | Button
  | Checkboxes
  | Datepicker
  | DateTimepicker
  | MultiSelect
  | Overflow
  | RadioButtons
  | Select
  | Timepicker
  | WorkflowButton
  | RichTextInput)[];
```

#### Description

An array of InteractiveElements objects.
There is a maximum of 25 elements in each action block.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:29

***

### type

```ts
type: "actions";
```

#### Description

The type of block. For an actions block, `type` is always `actions`.

#### Overrides

[`Block`](Interface.Block.md).[`type`](Interface.Block.md#type)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:24
