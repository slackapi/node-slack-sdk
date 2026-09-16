[@slack/web-api](../index.md) / DataTableBlock

# Interface: DataTableBlock

Defined in: packages/types/dist/block-kit/blocks.d.ts:207

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

### caption

```ts
caption: string;
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:219

#### Description

A caption for the table; used as the value for the HTML caption element.

***

### page\_size?

```ts
optional page_size?: number;
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:223

#### Description

Number of rows per page. Min `1`, Max `100`. Defaults to `5` if omitted.

***

### row\_header\_column\_index?

```ts
optional row_header_column_index?: number;
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:227

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

Defined in: packages/types/dist/block-kit/blocks.d.ts:215

#### Description

An array consisting of table rows.

***

### type

```ts
type: "data_table";
```

Defined in: packages/types/dist/block-kit/blocks.d.ts:211

#### Description

The type of block. For a data table block, `type` is always `data_table`.

#### Overrides

[`Block`](Block.md).[`type`](Block.md#type)
