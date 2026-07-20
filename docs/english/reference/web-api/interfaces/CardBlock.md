[@slack/web-api](../index.md) / CardBlock

# Interface: CardBlock

Defined in: packages/types/dist/block-kit/blocks.d.ts:69

## Description

Displays content in a card. At least one of `hero_image`, `title`, `actions`, or `body` must be provided.

## See

[Card block reference](https://docs.slack.dev/reference/block-kit/blocks/card-block).

## Extends

- [`Block`](Block.md)

## Properties

### actions?

```ts
optional actions: Button[];
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:100

#### Description

An array of [Button](Button.md) elements displayed at the bottom of the card.

***

### block\_id?

```ts
optional block_id: string;
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:15

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

Defined in: packages/types/dist/block-kit/blocks.d.ts:96

#### Description

The body text of the card in the form of a [MrkdwnElement](MrkdwnElement.md).
Maximum length for the text in this field is 200 characters.

***

### hero\_image?

```ts
optional hero_image: ImageElement;
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:77

#### Description

A top banner image for the card in the form of an [ImageElement](../type-aliases/ImageElement.md).

***

### icon?

```ts
optional icon: ImageElement;
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:81

#### Description

A small icon displayed next to the title and subtitle in the form of an [ImageElement](../type-aliases/ImageElement.md).

***

### subtitle?

```ts
optional subtitle: MrkdwnElement;
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:91

#### Description

The subtitle of the card in the form of a [MrkdwnElement](MrkdwnElement.md).
Maximum length for the text in this field is 150 characters.

***

### title?

```ts
optional title: MrkdwnElement;
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:86

#### Description

The title of the card in the form of a [MrkdwnElement](MrkdwnElement.md).
Maximum length for the text in this field is 150 characters.

***

### type

```ts
type: "card";
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:73

#### Description

The type of block. For a card block, `type` is always `card`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
