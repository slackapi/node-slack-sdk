# Interface: SectionBlock

## Description

Displays text, possibly alongside block elements. A section can be used as a simple text block, in
combination with text fields, or side-by-side with certain
[block elements](https://api.slack.com/reference/messaging/block-elements).

## See

[Section block reference](https://api.slack.com/reference/block-kit/blocks#section).

## Extends

- [`Block`](Interface.Block.md)

## Properties

### accessory?

```ts
optional accessory: 
  | Button
  | Actionable
  | Checkboxes
  | Datepicker
  | MultiSelect
  | Overflow
  | RadioButtons
  | Select
  | Timepicker
  | ImageElement;
```

#### Description

One of the compatible element objects.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:177

***

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

### fields?

```ts
optional fields: (PlainTextElement | MrkdwnElement)[];
```

#### Description

Required if no `text` is provided. An array of text objects. Any text objects included with `fields`
will be rendered in a compact format that allows for 2 columns of side-by-side text. Maximum number of items is 10.
Maximum length for the text in each item is 2000 characters.
[Click here for an example](https://app.slack.com/block-kit-builder/#%7B%22blocks%22:%5B%7B%22type%22:%22section%22,%22text%22:%7B%22text%22:%22A%20message%20*with%20some%20bold%20text*%20and%20_some%20italicized%20text_.%22,%22type%22:%22mrkdwn%22%7D,%22fields%22:%5B%7B%22type%22:%22mrkdwn%22,%22text%22:%22*Priority*%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%22*Type*%22%7D,%7B%22type%22:%22plain_text%22,%22text%22:%22High%22%7D,%7B%22type%22:%22plain_text%22,%22text%22:%22String%22%7D%5D%7D%5D%7D).

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:173

***

### text?

```ts
optional text: PlainTextElement | MrkdwnElement;
```

#### Description

The text for the block, in the form of a text object. Minimum length for the `text` in this field is
1 and maximum length is 3000 characters. This field is not required if a valid array of `fields` objects is
provided instead.

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:166

***

### type

```ts
type: "section";
```

#### Description

The type of block. For a section block, `type` is always `section`.

#### Overrides

[`Block`](Interface.Block.md).[`type`](Interface.Block.md#type)

#### Defined in

packages/web-api/node\_modules/@slack/types/dist/block-kit/blocks.d.ts:160
