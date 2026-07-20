[@slack/web-api](../index.md) / AlertBlock

# Interface: AlertBlock

Defined in: packages/types/dist/block-kit/blocks.d.ts:51

## Description

Displays alerts, warnings, and informational messages.

## See

[Alert block reference](https://docs.slack.dev/reference/block-kit/blocks/alert-block).

## Extends

- [`Block`](Block.md)

## Properties

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

### level?

```ts
optional level: "default" | "info" | "warning" | "error" | "success";
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:63

#### Description

The severity level of the alert. Defaults to `"default"` if omitted.

***

### text

```ts
text: TextObject;
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:59

#### Description

The alert message content in the form of a [TextObject](../type-aliases/TextObject.md).

***

### type

```ts
type: "alert";
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:55

#### Description

The type of block. For an alert block, `type` is always `alert`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
