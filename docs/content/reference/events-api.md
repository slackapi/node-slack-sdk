---
title: "@slack/events-api"
---

:::warning[Deprecation Notice]

_`@slack/events-api` officially reached EOL on May 31st, 2021. Development has fully stopped for this package and all remaining open issues and pull requests have been closed._

_At this time, we recommend migrating to [Bolt for JavaScript](https://github.com/slackapi/bolt-js), a framework that offers all of the functionality available in those packages (and more). To help with that process, we've provided some [migration samples](/tutorials/migrating-to-v6) for those looking to convert their existing apps._

:::

## Classes

### SlackEventAdapter

An adapter for Slack's Events API.

#### new SlackEventAdapter(signingSecret, opts)

Constructs a new instance of the `SlackEventAdapter` class

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| signingSecret | `string` | ✓   | The token used to authenticate signed requests from Slack's Events API. |
| opts | [`EventAdapterOptions`](#eventadapteroptions) | ✗   | See options. |

**Options**

| Name | Type |
| --- | --- |
| includeBody | `boolean` |
| includeHeaders | `boolean` |
| waitForResponse | `boolean` |

#### Fields {#slackeventadapter-fields}

| Name | Type | Description |
| --- | --- | --- |
| includeBody | `boolean` | Whether to include the API event bodies in adapter event listeners. |
| includeHeaders | `boolean` | Whether to include request headers in adapter event listeners. |
| signingSecret | `string` | The token used to authenticate signed requests from Slack's Events API. |
| waitForResponse | `boolean` | When `true` prevents the adapter from responding by itself and leaves that up to listeners. |

---

## Methods

### `createServer()`

Creates an HTTP server to listen for event payloads.

**Returns** `Promise<http.Server>`

### `expressMiddleware()`

Returns a middleware-compatible adapter.

**Returns** `RequestHandler`

### `requestListener()`

Creates a request listener.

**Returns** `RequestListener`

### `start(port)`

Starts a server on the specified port.

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| port | `number` | ✓   | The port number to listen on. |

**Returns** `Promise<http.Server>`

### `stop()`

Stops the server started by [`SlackEventAdapter`](#slackeventadapter).

**Returns** `Promise<void>`

---

## Functions

### `createEventAdapter(signingSecret, options)`

Creates a new [`SlackEventAdapter`](#slackeventadapter).

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| signingSecret | `string` | ✓   |
| options | [EventAdapterOptions`](#eventadapteroptions) | ✗   |

**Returns** [`SlackEventAdapter`](#slackeventadapter)

### `verifyRequestSignature(opts)`

Verifies the signature of a request. Throws a [`CodedError`](#codederror) if the signature is invalid.

#### Remarks

See [Verifying requests from Slack](https://api.slack.com/docs/verifying-requests-from-slack#sdk\_support) for more information.

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| opts | [`VerifyRequestSignatureParams`](#verifyrequestsignatureparams) | ✓   |

**Options:**

| Name | Type | Description |
| --- | --- | --- |
| body | `string` | Full, raw body string. |
| requestSignature | `string` | Signature from the `X-Slack-Signature` header. |
| requestTimestamp | `number` | Timestamp from the `X-Slack-Request-Timestamp` header. |
| signingSecret | `string` | The signing secret used to verify request signature. |

**Returns** `true`: `true` when the signature is valid.

---

## Enums

### `ErrorCode`

A dictionary of codes for errors produced by this package.

#### Members

*   `BodyParserNotPermitted`
*   `RequestTimeFailure`
*   `SignatureVerificationFailure`

---

## Interfaces

### `CodedError`

All errors produced by this package are regular [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) objects with an extra [`CodedError`](#codederror) field.

#### Fields

| Name | Type | Description |
| --- | --- | --- |
| code | [`ErrorCode`](#errorcode) | What kind of error occurred. |

### `EventAdapterOptions`

Options when constructing [`SlackEventAdapter`](#slackeventadapter). See the `SlackEventAdapter` [fields](#slackeventadapter-fields) for more information on what each option does.

#### Fields

| Name | Type |
| --- | --- |
| includeBody | `boolean` |
| includeHeaders | `boolean` |
| waitForResponse | `boolean` |

### `VerifyRequestSignatureParams`

Parameters for calling [`verifyRequestSignature`](#verifyrequestsignature).

#### Fields

| Name | Type | Description |
| --- | --- | --- |
| body | `string` | Full, raw body string. |
| requestSignature | `string` | Signature from the `X-Slack-Signature` header. |
| requestTimestamp | `number` | Timestamp from the `X-Slack-Request-Timestamp` header. |
| signingSecret | `string` | The signing secret used to verify request signature. |