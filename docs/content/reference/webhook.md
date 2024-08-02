---
title: "@slack/webhook"
---

## Classes 

### IncomingWebhook

A client for Slack's Incoming Webhooks

##### new IncomingWebhook(url, defaults)

Constructs a new instance of the `IncomingWebhook` class

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| url | `string` | ✓   |
| defaults | `[IncomingWebhookDefaultArguments](#incomingwebhookdefaultarguments)` | ✗   |

#### Methods

##### send(message)

Send a notification to a conversation

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| message | `string \| [IncomingWebhookSendArguments](#incomingwebhooksendarguments)` | ✓   | the message (a simple string, or an object describing the message) |

**Returns** `Promise<[IncomingWebhookResult](#incomingwebhookresult)>`

## Enums

### ErrorCode

A dictionary of codes for errors produced by this package

#### Members

*   **HTTPError**
*   **RequestError**

## Interfaces

### CodedError

All errors produced by this package adhere to this interface

#### Fields

| Name | Type |
| --- | --- |
| code | `[ErrorCode](#errorcode)` |

### IncomingWebhookDefaultArguments

#### Fields

| Name | Type |
| --- | --- |
| agent | `Agent` |
| channel | `string` |
| icon\_emoji | `string` |
| icon\_url | `string` |
| link\_names | `boolean` |
| text | `string` |
| username | `string` |

### IncomingWebhookHTTPError

#### Fields

| Name | Type |
| --- | --- |
| code | `ErrorCode.HTTPError` |
| original | `Error` |

### IncomingWebhookRequestError

#### Fields

| Name | Type |
| --- | --- |
| code | `ErrorCode.RequestError` |
| original | `Error` |

### IncomingWebhookResult

#### Fields

| Name | Type |
| --- | --- |
| text | `string` |

### IncomingWebhookSendArguments

#### Fields

| Name | Type |
| --- | --- |
| attachments | `MessageAttachment[]` |
| blocks | `(KnownBlock \| Block)[]` |
| unfurl\_links | `boolean` |
| unfurl\_media | `boolean` |

## Type Aliases

### IncomingWebhookSendError

```ts
IncomingWebhookHTTPError
```

One of:

*   [`IncomingWebhookHTTPError`](#incomingwebhookhttperror)