[@slack/web-api](../index.md) / MessageAttachmentField

# Interface: MessageAttachmentField

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:115

## Description

A field object to include in a [MessageAttachment](MessageAttachment.md).

## See

[Field objects reference](https://api.slack.com/reference/messaging/attachments#field_objects).

## Properties

### short?

```ts
optional short: boolean;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:129

#### Description

Indicates whether the field object is short enough to be displayed side-by-side with
other field objects. Defaults to `false`.

***

### title

```ts
title: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:120

#### Description

Shown as a bold heading displayed in the field object. It cannot contain markup and
will be escaped for you.

***

### value

```ts
value: string;
```

Defined in: node\_modules/@slack/types/dist/message-attachments.d.ts:124

#### Description

The text value displayed in the field object. It can be formatted as plain text, or with [\`mrkdwn\`](https://api.slack.com/reference/surfaces/formatting#basics) by using the `mrkdwn_in` option of [MessageAttachment](MessageAttachment.md).
