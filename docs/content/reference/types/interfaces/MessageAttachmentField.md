# Interface: MessageAttachmentField

## Description

A field object to include in a [MessageAttachment](MessageAttachment.md).

## See

[Field objects reference](https://api.slack.com/reference/messaging/attachments#field_objects).

## Properties

### short?

```ts
optional short: boolean;
```

#### Description

Indicates whether the field object is short enough to be displayed side-by-side with
other field objects. Defaults to `false`.

#### Defined in

[message-attachments.ts:138](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L138)

***

### title

```ts
title: string;
```

#### Description

Shown as a bold heading displayed in the field object. It cannot contain markup and
will be escaped for you.

#### Defined in

[message-attachments.ts:129](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L129)

***

### value

```ts
value: string;
```

#### Description

The text value displayed in the field object. It can be formatted as plain text, or with [`mrkdwn`](https://api.slack.com/reference/surfaces/formatting#basics) by using the `mrkdwn_in` option of [MessageAttachment](MessageAttachment.md).

#### Defined in

[message-attachments.ts:133](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/types/src/message-attachments.ts#L133)
