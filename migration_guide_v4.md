# Migration Guide for v4

This migration guide helps you transition an application written using the v3.x series of this package, to the v4.x
series. This guide focuses specifically on the breaking changes to help get your existing app up and running as
quickly as possible. In some cases, there may be better techniques for accomplishing what your app already does by
utilizing brand new features or new API. Learn about all the new features in our
[v4.0.0 release notes](https://github.com/slackapi/node-slack-sdk/releases/tag/v4.0.0) if you'd like
to go beyond a simple port.

## WebClient

### Constructor

*  The `slackAPIUrl` option has been renamed to `slackApiUrl`. It was confusing to see two acronyms directly
   next to each other, but with different casing.

## RTMClient

### Constructor

*  The `slackAPIUrl` option has been renamed to `slackApiUrl`. It was confusing to see two acronyms directly
   next to each other, but with different casing.
*  The `dataStore` option has been removed.
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
(see: http://bluebirdjs.com/docs/api/ascallback.html) or the Node [`util.callbackify()`](https://nodejs.org/api/util.html#util_util_callbackify_original) since v8.2.0.

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

## Constants

## Proxy Support with `agent`

**TODO**

## Custom TLS Configuration

**TODO**
