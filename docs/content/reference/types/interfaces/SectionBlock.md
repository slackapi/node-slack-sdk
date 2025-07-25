[@slack/types](../index.md) / SectionBlock

# Interface: SectionBlock

Defined in: [block-kit/blocks.ts:313](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L313)

## Description

Displays text, possibly alongside block elements. A section can be used as a simple text block, in
combination with text fields, or side-by-side with certain
[block elements](https://docs.slack.dev/reference/block-kit/block-elements).

## See

[Section block reference](https://docs.slack.dev/reference/block-kit/blocks/section-block).

## Extends

- [`Block`](Block.md)

## Properties

### accessory?

```ts
optional accessory: SectionBlockAccessory;
```

Defined in: [block-kit/blocks.ts:334](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L334)

#### Description

One of the compatible element objects.

***

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

### expand?

```ts
optional expand: boolean;
```

Defined in: [block-kit/blocks.ts:338](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L338)

Whether or not this section block's text should always expand when rendered. If false or not provided, it may be rendered with a 'see more' option to expand and show the full text. For AI Assistant apps, this allows the app to post long messages without users needing to click 'see more' to expand the message.

***

### fields?

```ts
optional fields: TextObject[];
```

Defined in: [block-kit/blocks.ts:330](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L330)

#### Description

Required if no `text` is provided. An array of text objects. Any text objects included with `fields`
will be rendered in a compact format that allows for 2 columns of side-by-side text. Maximum number of items is 10.
Maximum length for the text in each item is 2000 characters.
[Click here for an example](https://app.slack.com/block-kit-builder/#%7B%22blocks%22:%5B%7B%22type%22:%22section%22,%22text%22:%7B%22text%22:%22A%20message%20*with%20some%20bold%20text*%20and%20_some%20italicized%20text_.%22,%22type%22:%22mrkdwn%22%7D,%22fields%22:%5B%7B%22type%22:%22mrkdwn%22,%22text%22:%22*Priority*%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%22*Type*%22%7D,%7B%22type%22:%22plain_text%22,%22text%22:%22High%22%7D,%7B%22type%22:%22plain_text%22,%22text%22:%22String%22%7D%5D%7D%5D%7D).

***

### text?

```ts
optional text: TextObject;
```

Defined in: [block-kit/blocks.ts:323](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L323)

#### Description

The text for the block, in the form of a [TextObject](../type-aliases/TextObject.md). Minimum length for the `text` in this
field is 1 and maximum length is 3000 characters. This field is not required if a valid array of `fields` objects
is provided instead.

***

### type

```ts
type: "section";
```

Defined in: [block-kit/blocks.ts:317](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L317)

#### Description

The type of block. For a section block, `type` is always `section`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
