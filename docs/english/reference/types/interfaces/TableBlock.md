[@slack/types](../index.md) / TableBlock

# Interface: TableBlock

Defined in: [block-kit/blocks.ts:378](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L378)

## Description

Displays structured information in a table.

## See

[Table block reference](https://docs.slack.dev/reference/block-kit/blocks/table-block).

## Extends

- [`Block`](Block.md)

## Properties

### block\_id?

```ts
optional block_id: string;
```

Defined in: [block-kit/blocks.ts:48](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L48)

#### Description

A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
You can use this `block_id` when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

***

### column\_settings?

```ts
optional column_settings: TableBlockColumnSettings[];
```

Defined in: [block-kit/blocks.ts:390](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L390)

#### Description

An array describing column behavior. If there are fewer items in the column_settings array than there are columns in the table, then the items in the the column_settings array will describe the same number of columns in the table as there are in the array itself. Any additional columns will have the default behavior. Maximum 20 items.

***

### rows

```ts
rows: (
  | RichTextBlock
  | RawTextElement)[][];
```

Defined in: [block-kit/blocks.ts:386](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L386)

#### Description

An array consisting of table rows. Maximum 100 rows. Each row object is an array with a max of 20 table cells. Table cells can have a type of raw_text or rich_text.

***

### type

```ts
type: "table";
```

Defined in: [block-kit/blocks.ts:382](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L382)

#### Description

The type of block. For a table block, `type` is always `table`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
