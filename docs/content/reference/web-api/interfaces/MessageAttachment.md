[@slack/web-api](../index.md) / MessageAttachment

# Interface: MessageAttachment

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:8

Add [secondary attachments](https://api.slack.com/messaging/composing/layouts#attachments) to your messages in Slack.
Message attachments are considered a legacy part of messaging functionality. They are not deprecated per se, but they may change in the future, in ways that reduce their visibility or utility. We recommend moving to Block Kit instead. Read more about [when to use message attachments](https://api.slack.com/messaging/composing/layouts#when-to-use-attachments).

## See

[Secondary message attachments reference documentation](https://api.slack.com/reference/messaging/attachments)

## Properties

### actions?

```ts
optional actions: AttachmentAction[];
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:97

***

### app\_id?

```ts
optional app_id: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:107

***

### app\_unfurl\_url?

```ts
optional app_unfurl_url: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:105

***

### author\_icon?

```ts
optional author_icon: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:41

#### Description

A valid URL that displays a small 16px by 16px image to the left of the `author_name` text.
Will only work if `author_name` is present.

***

### author\_link?

```ts
optional author_link: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:36

#### Description

A valid URL that will hyperlink the `author_name` text. Will only work if `author_name` is present.

***

### author\_name?

```ts
optional author_name: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:32

#### Description

Small text used to display the author's name.

***

### author\_subname?

```ts
optional author_subname: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:42

***

### blocks?

```ts
optional blocks: AnyBlock[];
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:13

#### Description

An array of [layout blocks](../type-aliases/KnownBlock.md) in the same format
[as described in the building blocks guide](https://api.slack.com/block-kit/building).

***

### bot\_id?

```ts
optional bot_id: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:108

***

### callback\_id?

```ts
optional callback_id: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:98

***

### color?

```ts
optional color: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:23

#### Description

Changes the color of the border on the left side of this attachment from the default gray. Can either
be one of `good` (green), `warning` (yellow), `danger` (red), or any hex color code (eg. `#439FE0`)

***

### fallback?

```ts
optional fallback: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:18

#### Description

A plain text summary of the attachment used in clients that
don't show formatted text (e.g. mobile notifications).

***

### fields?

```ts
optional fields: MessageAttachmentField[];
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:63

#### Description

An array of [MessageAttachmentField](MessageAttachmentField.md) that get displayed in a table-like way
(see [this example](https://api.slack.com/reference/messaging/attachments#example)).
For best results, include no more than 2-3 field objects.

***

### footer?

```ts
optional footer: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:83

#### Description

Some brief text to help contextualize and identify an attachment. Limited to 300 characters,
and may be truncated further when displayed to users in environments with limited screen real estate.

***

### footer\_icon?

```ts
optional footer_icon: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:89

#### Description

A valid URL to an image file that will be displayed beside the `footer` text.
Will only work if `footer` is present. We'll render what you provide at 16px by 16px.
It's best to use an image that is similarly sized.

***

### image\_url?

```ts
optional image_url: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:70

#### Description

A valid URL to an image file that will be displayed at the bottom of the attachment.
We support GIF, JPEG, PNG, and BMP formats.
Large images will be resized to a maximum width of 360px or a maximum height of 500px, while still
maintaining the original aspect ratio. Cannot be used with `thumb_url`.

***

### is\_app\_unfurl?

```ts
optional is_app_unfurl: boolean;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:106

***

### mrkdwn\_in?

```ts
optional mrkdwn_in: ("text" | "pretext" | "fields")[];
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:104

#### Description

Field names that should be [formatted by \`mrkdwn\` syntax](https://api.slack.com/reference/surfaces/formatting#basics).
The fields that can be formatted in this way include the names of the `fields` property, or
the `text` or `pretext` properties.

***

### pretext?

```ts
optional pretext: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:28

#### Description

Text that appears above the message attachment block. It can be formatted as plain text,
or with [\`mrkdwn\`](https://api.slack.com/reference/surfaces/formatting#basics) by including it in the `mrkdwn_in` field.

***

### preview?

```ts
optional preview: MessageAttachmentPreview;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:109

***

### text?

```ts
optional text: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:57

#### Description

The main body text of the attachment. It can be formatted as plain text, or with
[\`mrkdwn\`](https://api.slack.com/reference/surfaces/formatting#basics) by including it in the `mrkdwn_in` field.
The content will automatically collapse if it contains 700+ characters or 5+ line breaks, and will display
a "Show more..." link to expand the content.

***

### thumb\_url?

```ts
optional thumb_url: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:78

#### Description

A valid URL to an image file that will be displayed as a thumbnail on the right side of
a message attachment. We currently support the following formats: GIF, JPEG, PNG, and BMP.
The thumbnail's longest dimension will be scaled down to 75px while maintaining the aspect ratio of the image.
The file size of the image must also be less than 500 KB.
For best results, please use images that are already 75px by 75px.

***

### title?

```ts
optional title: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:46

#### Description

Large title text near the top of the attachment.

***

### title\_link?

```ts
optional title_link: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:50

#### Description

A valid URL that turns the `title` text into a hyperlink.

***

### ts?

```ts
optional ts: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:96

#### Description

A Unix timestamp that is used to relate your attachment to a specific time.
The attachment will display the additional timestamp value as part of the attachment's footer.
Your message's timestamp will be displayed in varying ways, depending on how far in the past or future it is,
relative to the present. Form factors, like mobile versus desktop may also transform its rendered appearance.
