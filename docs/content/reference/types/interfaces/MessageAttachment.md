# Interface: MessageAttachment

Add [secondary attachments](https://api.slack.com/messaging/composing/layouts#attachments) to your messages in Slack.
Message attachments are considered a legacy part of messaging functionality. They are not deprecated per se, but they may change in the future, in ways that reduce their visibility or utility. We recommend moving to Block Kit instead. Read more about [when to use message attachments](https://api.slack.com/messaging/composing/layouts#when-to-use-attachments).

## See

[Secondary message attachments reference documentation](https://api.slack.com/reference/messaging/attachments)

## Properties

### actions?

```ts
optional actions: AttachmentAction[];
```

#### Defined in

[message-attachments.ts:105](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L105)

***

### app\_id?

```ts
optional app_id: string;
```

#### Defined in

[message-attachments.ts:115](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L115)

***

### app\_unfurl\_url?

```ts
optional app_unfurl_url: string;
```

#### Defined in

[message-attachments.ts:113](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L113)

***

### author\_icon?

```ts
optional author_icon: string;
```

#### Description

A valid URL that displays a small 16px by 16px image to the left of the `author_name` text.
Will only work if `author_name` is present.

#### Defined in

[message-attachments.ts:49](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L49)

***

### author\_link?

```ts
optional author_link: string;
```

#### Description

A valid URL that will hyperlink the `author_name` text. Will only work if `author_name` is present.

#### Defined in

[message-attachments.ts:44](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L44)

***

### author\_name?

```ts
optional author_name: string;
```

#### Description

Small text used to display the author's name.

#### Defined in

[message-attachments.ts:40](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L40)

***

### author\_subname?

```ts
optional author_subname: string;
```

#### Defined in

[message-attachments.ts:50](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L50)

***

### blocks?

```ts
optional blocks: AnyBlock[];
```

#### Description

An array of [layout blocks](../type-aliases/KnownBlock.md) in the same format
[as described in the building blocks guide](https://api.slack.com/block-kit/building).

#### Defined in

[message-attachments.ts:21](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L21)

***

### bot\_id?

```ts
optional bot_id: string;
```

#### Defined in

[message-attachments.ts:116](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L116)

***

### callback\_id?

```ts
optional callback_id: string;
```

#### Defined in

[message-attachments.ts:106](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L106)

***

### color?

```ts
optional color: string;
```

#### Description

Changes the color of the border on the left side of this attachment from the default gray. Can either
be one of `good` (green), `warning` (yellow), `danger` (red), or any hex color code (eg. `#439FE0`)

#### Defined in

[message-attachments.ts:31](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L31)

***

### fallback?

```ts
optional fallback: string;
```

#### Description

A plain text summary of the attachment used in clients that
don't show formatted text (e.g. mobile notifications).

#### Defined in

[message-attachments.ts:26](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L26)

***

### fields?

```ts
optional fields: MessageAttachmentField[];
```

#### Description

An array of [MessageAttachmentField](MessageAttachmentField.md) that get displayed in a table-like way
(see [this example](https://api.slack.com/reference/messaging/attachments#example)).
For best results, include no more than 2-3 field objects.

#### Defined in

[message-attachments.ts:71](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L71)

***

### footer?

```ts
optional footer: string;
```

#### Description

Some brief text to help contextualize and identify an attachment. Limited to 300 characters,
and may be truncated further when displayed to users in environments with limited screen real estate.

#### Defined in

[message-attachments.ts:91](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L91)

***

### footer\_icon?

```ts
optional footer_icon: string;
```

#### Description

A valid URL to an image file that will be displayed beside the `footer` text.
Will only work if `footer` is present. We'll render what you provide at 16px by 16px.
It's best to use an image that is similarly sized.

#### Defined in

[message-attachments.ts:97](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L97)

***

### image\_url?

```ts
optional image_url: string;
```

#### Description

A valid URL to an image file that will be displayed at the bottom of the attachment.
We support GIF, JPEG, PNG, and BMP formats.
Large images will be resized to a maximum width of 360px or a maximum height of 500px, while still
maintaining the original aspect ratio. Cannot be used with `thumb_url`.

#### Defined in

[message-attachments.ts:78](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L78)

***

### is\_app\_unfurl?

```ts
optional is_app_unfurl: boolean;
```

#### Defined in

[message-attachments.ts:114](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L114)

***

### mrkdwn\_in?

```ts
optional mrkdwn_in: ("text" | "pretext" | "fields")[];
```

#### Description

Field names that should be [formatted by `mrkdwn` syntax](https://api.slack.com/reference/surfaces/formatting#basics).
The fields that can be formatted in this way include the names of the `fields` property, or
the `text` or `pretext` properties.

#### Defined in

[message-attachments.ts:112](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L112)

***

### pretext?

```ts
optional pretext: string;
```

#### Description

Text that appears above the message attachment block. It can be formatted as plain text,
or with [`mrkdwn`](https://api.slack.com/reference/surfaces/formatting#basics) by including it in the `mrkdwn_in` field.

#### Defined in

[message-attachments.ts:36](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L36)

***

### preview?

```ts
optional preview: MessageAttachmentPreview;
```

#### Defined in

[message-attachments.ts:117](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L117)

***

### text?

```ts
optional text: string;
```

#### Description

The main body text of the attachment. It can be formatted as plain text, or with
[`mrkdwn`](https://api.slack.com/reference/surfaces/formatting#basics) by including it in the `mrkdwn_in` field.
The content will automatically collapse if it contains 700+ characters or 5+ line breaks, and will display
a "Show more..." link to expand the content.

#### Defined in

[message-attachments.ts:65](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L65)

***

### thumb\_url?

```ts
optional thumb_url: string;
```

#### Description

A valid URL to an image file that will be displayed as a thumbnail on the right side of
a message attachment. We currently support the following formats: GIF, JPEG, PNG, and BMP.
The thumbnail's longest dimension will be scaled down to 75px while maintaining the aspect ratio of the image.
The file size of the image must also be less than 500 KB.
For best results, please use images that are already 75px by 75px.

#### Defined in

[message-attachments.ts:86](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L86)

***

### title?

```ts
optional title: string;
```

#### Description

Large title text near the top of the attachment.

#### Defined in

[message-attachments.ts:54](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L54)

***

### title\_link?

```ts
optional title_link: string;
```

#### Description

A valid URL that turns the `title` text into a hyperlink.

#### Defined in

[message-attachments.ts:58](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L58)

***

### ts?

```ts
optional ts: string;
```

#### Description

A Unix timestamp that is used to relate your attachment to a specific time.
The attachment will display the additional timestamp value as part of the attachment's footer.
Your message's timestamp will be displayed in varying ways, depending on how far in the past or future it is,
relative to the present. Form factors, like mobile versus desktop may also transform its rendered appearance.

#### Defined in

[message-attachments.ts:104](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L104)
