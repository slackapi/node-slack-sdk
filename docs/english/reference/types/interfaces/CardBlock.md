[@slack/types](../index.md) / CardBlock

# Interface: CardBlock

Defined in: [block-kit/blocks.ts:139](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L139)

## Description

A rich display block for presenting structured content such as recommendations, results, or work items.
At least one of `hero_image`, `title`, `actions`, or `body` must be provided.

## See

[Card block reference](https://docs.slack.dev/reference/block-kit/blocks/card-block).

## Extends

- [`Block`](Block.md)

## Properties

### actions?

```ts
optional actions: Button[];
```

Defined in: [block-kit/blocks.ts:170](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L170)

#### Description

An array of [Button](Button.md) elements displayed at the bottom of the card.

***

### block\_id?

```ts
optional block_id: string;
```

Defined in: [block-kit/blocks.ts:49](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L49)

#### Description

A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
You can use this `block_id` when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

***

### body?

```ts
optional body: MrkdwnElement;
```

Defined in: [block-kit/blocks.ts:166](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L166)

#### Description

The body text of the card in the form of a [MrkdwnElement](MrkdwnElement.md).
Maximum length for the text in this field is 200 characters.

***

### hero\_image?

```ts
optional hero_image: ImageElement;
```

Defined in: [block-kit/blocks.ts:147](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L147)

#### Description

A top banner image for the card in the form of an [ImageElement](../type-aliases/ImageElement.md).

***

### icon?

```ts
optional icon: ImageElement;
```

Defined in: [block-kit/blocks.ts:151](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L151)

#### Description

A small icon displayed next to the title and subtitle in the form of an [ImageElement](../type-aliases/ImageElement.md).

***

### subtitle?

```ts
optional subtitle: MrkdwnElement;
```

Defined in: [block-kit/blocks.ts:161](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L161)

#### Description

The subtitle of the card in the form of a [MrkdwnElement](MrkdwnElement.md).
Maximum length for the text in this field is 150 characters.

***

### title?

```ts
optional title: MrkdwnElement;
```

Defined in: [block-kit/blocks.ts:156](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L156)

#### Description

The title of the card in the form of a [MrkdwnElement](MrkdwnElement.md).
Maximum length for the text in this field is 150 characters.

***

### type

```ts
type: "card";
```

Defined in: [block-kit/blocks.ts:143](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L143)

#### Description

The type of block. For a card block, `type` is always `card`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
