This migration guide helps you transition an application written using the `v3.x` series of this package, to the `v4.x`
series. This guide focuses specifically on the breaking changes to help get your existing app up and running as
quickly as possible. In some cases, there may be better techniques for accomplishing what your app already does by
utilizing brand new features or new API. Learn about all the new features in our
[`v4.0.0` release notes](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.0.0) if you'd like
to go beyond a simple port.

## WebClient

### Constructor

*  The `slackAPIUrl` option has been renamed to `slackApiUrl` to improve readability.
*  The `transport` option has been removed. If you used this option to implement proxy support, use the new `agent`
   option as described [below](#proxy-support-with-agent). If you used this option for setting custom TLS configuration,
   use the new `tls` option as described [below](#custom-tls-configuration). If you were using this for
   some other reason, please [open an issue](https://github.com/slackapi/node-slack-sdk/issues/new) and describe your
   use case so we can help you migrate.

### All methods

#### 🚨 **All Web API methods no longer take positional arguments.** 🚨

They each take one argument, an object, in which some
properties are required and others are optional (depending on the method). You no longer have to memorize or look up
the order of the arguments. The method arguments are described in the
[API method documentation](https://api.slack.com/methods). If you are using an editor that understands TypeScript or
JSDoc annotations, your editor may present you with useful information about these arguments as you type.

If any Web API method is called with a callback parameter, and the call results in an error from the platform, you will
no longer get the platform's response as the second argument to the callback. Instead, that response will exist as the
`.data` property on the first argument (the error). You can consolidate this logic by using Promises instead (or
continue to use callbacks if you prefer).

**Before:**

```javascript
const { WebClient } = require('@slack/client')
const web = new WebClient(token);

web.chat.postMessage(channelId, text, { as_user: true, parse: 'full' }, (error, resp) => {
  if (error) {
    if (resp) {
      // a platform error occurred, `resp.error` contains the error information
    }
    // some other error occurred
    return;
  }

  // success
});
```

**After:**

```javascript
// a new export, ErrorCode, is a dictionary of known error types
const { WebClient, ErrorCode } = require('@slack/client')
const web = new WebClient(token);

web.chat.postMessage({ channel: channelId, text, as_user: true, parse: 'full' })
  .then((resp) => { /* success */ })
  .catch((error) => {
    if (error.code === ErrorCode.PlatformError) {
      // a platform error occurred, `error.message` contains error information, `error.data` contains the entire resp
    } else {
      // some other error occurred
    }
  });
```

### dm

This family of methods was always a duplicate of those under the `.im` family. These duplicates have been removed.

### mpdm

This family of methods was always a duplicate of those under the `.mpim` family. These duplicates have been removed.

## RTMClient

The top-level export name has changed from `RtmClient` to `RTMClient`.

### Constructor

*  The `slackAPIUrl` option has been renamed to `slackApiUrl` to improve readability.
*  The `dataStore` option has been removed. See the [DataStore v3.x Migration Guide](https://github.com/slackapi/node-slack-sdk/wiki/DataStore-v3.x-Migration-Guide).
*  The `useRtmConnect` option now has a default value of `true`. We recommend querying for additional data using a
   `WebClient` after this client is connected. If that doesn't help, then you can set this option to `false`.
*  The `socketFn` option has been removed. If you used this option to implement proxy support, use the new `agent`
   option as described [below](#proxy-support-with-agent). If you used this option for setting custom TLS
   configuration, use the new `tls` option as described [below](#custom-tls-configuration). If you were using this for
   some other reason, please [open an issue](https://github.com/slackapi/node-slack-sdk/issues/new) and describe your
   use case so we can help you migrate.
*  The `wsPingInterval` and `maxPongInterval` options have been replaced with `clientPingTimeout` and
   `serverPongTimeout`. Most likely, you can replace these values respectively, or drop using them all together.

### dataStore

The data store has been removed from the `RTMClient`. See the
[DataStore v3.x Migration Guide](https://github.com/slackapi/node-slack-sdk/wiki/DataStore-v3.x-Migration-Guide) for
more details on this change.

### reconnect()

This method has been removed, but it can be substituted by using `disconnect()`, waiting for the `disconnected` event,
and then calling `start(options)`. Reconnecting using the method was rarely used by developers, and its implementation
increased the complexity of state management in the client.

**Before:**

```javascript
rtm.reconnect();
```

**After:**

```javascript
rtm.disconnect();
// You will need to store the start options from the first time you connect and then reuse them here.
rtm.once('disconnected', () => rtm.start(options));
```

### updateMessage()

This method has been removed from the `RTMClient`, but can be substituted by using the `WebClient`.

**Before:**

```javascript
const message = { ts: '999999999.0000000', channel: 'C123456', text: 'updated message text' };
rtm.updateMessage(message).then(console.log);
```

**After:**

```javascript
// We recommend that you initialize this object at the same time you would have initialized the RTMClient
const web = new WebClient(token);

const message = { ts: '999999999.0000000', channel: 'C123456', text: 'updated message text' };
web.chat.update(message).then(console.log);
```

### send()

This method has be repurposed, and in most cases you will instead rely on `addOutgoingEvent(awaitReply, type, body)`.

The main difference is that if you want to know when the message is acknowledged by the server (you were using the
optional callback parameter to `send()`), you'll only be able to do so using the returned Promise. If you prefer
callbacks, you can translate the interface using a library like Bluebird
(see: http://bluebirdjs.com/docs/api/ascallback.html) or the Node
[`util.callbackify()`](https://nodejs.org/api/util.html#util_util_callbackify_original) since v8.2.0.

As an added benefit, you will be able to send the message without worrying whether the client is in a connected state
or not.

**Before:**

```javascript
const message = { type: 'message_type', key: 'value', foo: 'bar' };
rtm.send(message, (error, resp) => {
  if (error) {
    // error handling
    return;
  }
  // success handling
});
```

**After:**

```javascript
const message = { type: 'message_type', key: 'value', foo: 'bar' };
rtm.addOutgoingEvent(true, message.type, message)
  .then((resp) => {
    // success handling
  })
  .catch((error) => {
    // error handling
  });
```

### Events

The `RTMClient` now has more well-defined states (and substates) that you may observe using the
[`EventEmitter` API pattern](https://nodejs.org/api/events.html). The following table helps describe the relationship
between events in the `v3.x` series and events in the `v4.x` series.

| Event Name (`v4.x`) | Event Name (`v3.x`) | Description |
|-----------------|-----------------|-------------|
| `disconnected`  | `disconnect`    | The client is not connected to the platform. This is a steady state - no attempt to connect is occurring. |
| `connecting`    | `connecting` / `attempting_reconnect`   | The client is in the process of connecting to the platform. |
| `authenticated` | `authenticated` | The client has authenticated with the platform. The `rtm.connect` or `rtm.start` response is emitted as an argument. This is a sub-state of `connecting`. |
| `connected`     |                 | The client is connected to the platform and incoming events will start being emittied. |
| `ready`         | `open`          | The client is ready to send outgoing messages. This is a sub-state of `connected` |
| `disconnecting` |                 | The client is no longer connected to the platform and cleaning up its resources. It will soon transition to `disconnected`. |
| `reconnecting`  |                 | The client is no longer connected to the platform and cleaning up its resources. It will soon transition to `connecting`. |
| `error`         | `ws_error`      | An error has occurred. The error is emitted as an argument. The `v4` event is a super set of the `v3` event. To test whether the event is a websocket error, check `error.code === ErrorCodes.RTMWebsocketError` |
| `unable_to_rtm_start` | `unable_to_rtm_start` | A problem occurred while connecting, a reconnect may or may not occur. Use of this event is discouraged since `disconnecting` and `reconnecting` are more meaningful. |
| `slack_event`   |                 | An incoming Slack event has been received. The event type and event body are emitted as the arguments. |
| `{type}`        | `{type}`        | An incoming Slack event of type `{type}` has been received. The event is emitted as an argument. An example is `message` for all message events |
| `{type}::{subtype}` | `{type}::{subtype}` | An incoming Slack event of type `{type}` and subtype `{subtype}` has been received. The event is emitted as an argument. An example is `message::bot_message` for all bot messages. |
| `raw_message`   | `raw_message`   | A websocket message arrived. The message (unparsed string) is emitted as an argument. Use of this event is discouraged since `slack_event` is more useful. |
|                 | `ws_opening`    | This event is no longer emitted, and the state of the underlying websocket is considered private. |
|                 | `ws_opened`     | This event is no longer emitted, and the state of the underlying websocket is considered private. |
|                 | `ws_close`      | This event is no longer emitted, and the state of the underlying websocket is considered private. |

## Incoming Webhooks

*  The following options have been renamed:
   - `iconEmoji` => `icon_emoji`
   - `iconUrl` => `icon_url`
   - `linkNames` => `link_names`
   - `unfurlLinks` => `unfurl_links`
   - `unfurlMedia` => `unfurl_media`

## CLIENT_EVENTS, RTM_EVENTS, RTM_MESSAGE_SUBTYPES

These constants have been removed. We recommend using simple strings for event names. The values that were in
`CLIENT_EVENTS` have been migrated according to the [events table above](#events). The `RTM_EVENTS` dictionary isn't
necessary, just directly subscribe to the event name as a string.

**Before:**
```javascript
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (connectionData) => {
  console.log('RTMClient authenticated');
});

rtm.on(RTM_EVENTS.MESSAGE, (event) => {
  console.log(`Incoming message: ${event.ts}`);
})
```

**After:**
```javascript
rtm.on('authenticated', (connectionData) => {
  console.log('RTMClient authenticated');
});

rtm.on('message', (event) => {
  console.log(`Incoming message: ${event.ts}`);
})
```

## RETRY_POLICIES

The names of these policies have slightly changed for more consistency with our style guide. The dictionary of policies
is now exported under the name `retryPolicies`. See `src/retry-policies.ts` for details.

## Proxy Support with `agent`

In order to pass outgoing requests from `WebClient` or `RTMClient` through an HTTP proxy, you'll first need to install
an additional package in your application:

```
$ npm install --save https-proxy-agent
```

Next, use the `agent` option in the client constructor to configure with your proxy settings.

```javascript
const HttpsProxyAgent = require('https-proxy-agent');
const { WebClient, RTMClient } = require('@slack/client');

// in this example, we read the token from an environment variable. its best practice to keep sensitive data outside
// your source code.
const token = process.env.SLACK_TOKEN;

// its common to read the proxy URL from an environment variable, since it also may be sensitive.
const proxyUrl = process.env.http_proxy || 'http://12.34.56.78:9999';

// To use Slack's Web API:
const web = new WebClient(token, { agent: new HttpsProxyAgent(proxyUrl) });

// To use Slack's RTM API:
const rtm = new RTMClient(token, { agent: new HttpsProxyAgent(proxyUrl) });

// NOTE: for a more complex proxy configuration, see the https-proxy-agent documentation:
// https://github.com/TooTallNate/node-https-proxy-agent#api
```

## Custom TLS Configuration

You may want to use a custom TLS configuration if your application needs to send requests through a server with a
self-signed certificate.

Example:

```javascript
const { WebClient, RTMClient } = require('@slack/client');

// in this example, we read the token from an environment variable. its best practice to keep sensitive data outside
// your source code.
const token = process.env.SLACK_TOKEN;

// Configure TLS options
const tls = {
  key: fs.readFileSync('/path/to/key'),
  cert: fs.readFileSync('/path/to/cert'),
  ca: fs.readFileSync('/path/to/cert'),
};

const web = new WebClient(token, { slackApiUrl: 'https://fake.slack.com/api', tls });
const rtm = new RTMClient(token, { slackApiUrl: 'https://fake.slack.com/api', tls });
```
