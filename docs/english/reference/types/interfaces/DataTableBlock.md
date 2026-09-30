[@slack/types](../index.md) / DataTableBlock

# Interface: DataTableBlock

Defined in: [block-kit/blocks.ts:298](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L298)

## Description

Displays rich tables that support pagination, sorting, filtering, and interactivity.

## See

[Data table block reference](https://docs.slack.dev/reference/block-kit/blocks/data-table-block).

## Extends

- [`Block`](Block.md)

## Properties

### block\_id?

```ts
optional block_id?: string;
```

Defined in: [block-kit/blocks.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L50)

#### Description

A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
You can use this `block_id` when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads).
Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
a message. If a message is updated, use a new `block_id`.

#### Inherited from

[`Block`](Block.md).[`block_id`](Block.md#block_id)

***

### caption

```ts
caption: string;
```

Defined in: [block-kit/blocks.ts:310](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L310)

#### Description

A caption for the table; used as the value for the HTML caption element.

***

### page\_size?

```ts
optional page_size?: number;
```

Defined in: [block-kit/blocks.ts:314](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L314)

#### Description

Number of rows per page. Min `1`, Max `100`. Defaults to `5` if omitted.

***

### row\_header\_column\_index?

```ts
optional row_header_column_index?: number;
```

Defined in: [block-kit/blocks.ts:318](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L318)

#### Description

The 0-based index of the column that uniquely identifies each row (the row header). This column is treated as the row's primary identifier for screen readers. Defaults to `0` if omitted.

***

### rows

```ts
rows: (
  | RichTextBlock
  | RawTextElement
  | RawNumberElement)[][];
```

Defined in: [block-kit/blocks.ts:306](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L306)

#### Description

An array consisting of table rows.

***

### type

```ts
type: "data_table";
```

Defined in: [block-kit/blocks.ts:302](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/blocks.ts#L302)

#### Description

The type of block. For a data table block, `type` is always `data_table`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
