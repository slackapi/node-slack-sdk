[@slack/web-api](../index.md) / RichTextDate

# Interface: RichTextDate

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:640

## Description

A date element for use in a rich text message.

## Extends

- [`RichTextStyleable`](RichTextStyleable.md)

## Properties

### fallback?

```ts
optional fallback: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:680

#### Description

Text to display in place of the date should parsing, formatting or displaying fails.

***

### format

```ts
format: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:672

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

***

### style?

```ts
optional style: object;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:75

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

***

### timestamp

```ts
timestamp: number;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:648

#### Description

A UNIX timestamp for the date to be displayed in seconds.

***

### type

```ts
type: "date";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:644

#### Description

The type of element. In this case `type` is always `date`.

***

### url?

```ts
optional url: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:676

#### Description

URL to link the entire `format` string to.
