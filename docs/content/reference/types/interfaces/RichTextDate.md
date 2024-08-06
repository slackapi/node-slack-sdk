# Interface: RichTextDate

## Description

A date element for use in a rich text message.

## Extends

- [`RichTextStyleable`](RichTextStyleable.md)

## Properties

### fallback?

```ts
optional fallback: string;
```

#### Description

Text to display in place of the date should parsing, formatting or displaying fails.

#### Defined in

[block-kit/block-elements.ts:840](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L840)

***

### format

```ts
format: string;
```

#### Description

A template string containing curly-brace-enclosed tokens to substitute your provided `timestamp`
in a particularly-formatted way. For example: `Posted at {date_long}`. The available date formatting tokens are:
- `{day_divider_pretty}`: Shows `today`, `yesterday` or `tomorrow` if applicable. Otherwise, if the date is in
  current year, uses the `{date_long}` format without the year. Otherwise, falls back to using the `{date_long}`
  format.
- `{date_num}`: Shows date as YYYY-MM-DD.
- `{date_slash}`: Shows date as DD/MM/YYYY (subject to locale preferences).
- `{date_long}`: Shows date as a long-form sentence including day-of-week, e.g. `Monday, December 23rd, 2013`.
- `{date_long_full}`: Shows date as a long-form sentence without day-of-week, e.g. `August 9, 2020`.
- `{date_long_pretty}`: Shows `yesterday`, `today` or `tomorrow`, otherwise uses the `{date_long}` format.
- `{date}`: Same as `{date_long_full}` but without the year.
- `{date_pretty}`: Shows `today`, `yesterday` or `tomorrow` if applicable, otherwise uses the `{date}` format.
- `{date_short}`: Shows date using short month names without day-of-week, e.g. `Aug 9, 2020`.
- `{date_short_pretty}`: Shows `today`, `yesterday` or `tomorrow` if applicable, otherwise uses the `{date_short}`
  format.
- `{time}`: Depending on user preferences, shows just the time-of-day portion of the timestamp using either 12 or
  24 hour clock formats, e.g. `2:34 PM` or `14:34`.
- `{time_secs}`: Depending on user preferences, shows just the time-of-day portion of the timestamp using either 12
  or 24 hour clock formats, including seconds, e.g. `2:34:56 PM` or `14:34:56`.
- `{ago}`: A human-readable period of time, e.g. `3 minutes ago`, `4 hours ago`, `2 days ago`.
TODO: test/document `{member_local_time}`, `{status_expiration}` and `{calendar_header}`

#### Defined in

[block-kit/block-elements.ts:832](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L832)

***

### style?

```ts
optional style: object;
```

#### bold?

```ts
optional bold: boolean;
```

##### Description

When `true`, boldens the text in this element. Defaults to `false`.

#### code?

```ts
optional code: boolean;
```

##### Description

When `true`, the text is preformatted in an inline code style. Defaults to `false.

#### italic?

```ts
optional italic: boolean;
```

##### Description

When `true`, italicizes the text in this element. Defaults to `false`.

#### strike?

```ts
optional strike: boolean;
```

##### Description

When `true`, strikes through the text in this element. Defaults to `false`.

#### Description

A limited style object for styling rich text `text` elements.

#### Inherited from

[`RichTextStyleable`](RichTextStyleable.md).[`style`](RichTextStyleable.md#style)

#### Defined in

[block-kit/extensions.ts:86](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/extensions.ts#L86)

***

### timestamp

```ts
timestamp: number;
```

#### Description

A UNIX timestamp for the date to be displayed in seconds.

#### Defined in

[block-kit/block-elements.ts:808](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L808)

***

### type

```ts
type: "date";
```

#### Description

The type of element. In this case `type` is always `date`.

#### Defined in

[block-kit/block-elements.ts:804](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L804)

***

### url?

```ts
optional url: string;
```

#### Description

URL to link the entire `format` string to.

#### Defined in

[block-kit/block-elements.ts:836](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/block-elements.ts#L836)
