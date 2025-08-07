[@slack/types](../index.md) / MessageAttachmentField

# Interface: MessageAttachmentField

Defined in: [message-attachments.ts:124](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-attachments.ts#L124)

## Description

A field object to include in a [MessageAttachment](MessageAttachment.md).

## See

[Field objects reference](https://docs.slack.dev/messaging/formatting-message-text#attachments).

## Properties

### short?

```ts
optional short: boolean;
```

Defined in: [message-attachments.ts:138](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-attachments.ts#L138)

#### Description

Indicates whether the field object is short enough to be displayed side-by-side with
other field objects. Defaults to `false`.

***

### title

```ts
title: string;
```

Defined in: [message-attachments.ts:129](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-attachments.ts#L129)

#### Description

Shown as a bold heading displayed in the field object. It cannot contain markup and
will be escaped for you.

***

### value

```ts
value: string;
```

Defined in: [message-attachments.ts:133](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-attachments.ts#L133)

#### Description

The text value displayed in the field object. It can be formatted as plain text, or with [\`mrkdwn\`](https://docs.slack.dev/messaging/formatting-message-text) by using the `mrkdwn_in` option of [MessageAttachment](MessageAttachment.md).
