---
title: Migrating to v5.x
order: 1
slug: migrating_to_v5
---

# Migration Guide (v4 to v5)

This tutorial will guide you through the process of updating your app from using the `@slack/client` package (`v4.x`)
to using the new, improved, and independent packages, starting with `v5.0.0`.

If you were not using any deprecated features, this should only take a couple minutes.

**Note**: If you were using the `@slack/events-api` or `@slack/interactive-messages` packages, this migration doesn't
affect your app. Those packages only moved repositories, but did not get updated in this process. You're done!

## Update to a supported version of Node

These package have dropped support for versions of Node that are no longer supported. We recommend updating to the
latest LTS version of [Node](https://nodejs.org/en/), which at this time is v10.15.3. The minimum supported version is
v8.9.0.

**Note**: Learn more about our [support schedule](https://github.com/slackapi/node-slack-sdk/wiki/Support-Schedule) so
that you can prepare and plan for future updates.

## Choose the right packages

In `v4.x` versions, the package came with a few classes. If your app only needed one or two of these classes, then
downloading the whole package needlessly increased the size of your dependencies. Your app no longer has to download or
import the code it won't be using.

Identify which classes your app imported from `@slack/client`. The following table helps you choose and install the
right package(s) for your app, depending on which classes the app used.

| Class name        | Command to install           | Changes                                        |
|-------------------|------------------------------|------------------------------------------------|
| `WebClient`       | `npm install @slack/web-api` | [`WebClient` changes](#webclient)              |
| `RTMClient`       | `npm install @slack/rtm-api` | [`RTMClient` changes](#rtmclient)              |
| `IncomingWebhook` | `npm install @slack/webhook` | [`IncomingWebhook` changes](#incomingwebhook)  |

After you've installed the right package(s), remove `@slack/client` with the following command:

```shell
$ npm uninstall @slack/client
```

Next, change all the `require()` or `import` statements from using the `@slack/client` name, to the name of the new
package. For example:

```javascript
// Before:
const { WebClient } = require('@slack/client');

// After:
const { WebClient } = require('@slack/web-api');
```

Finally, apply the changes for the individual classes used in your app in the sections below.

**Shortcut**: While we recommend migrating to the individual packages as soon as possible, one way to ease into the
process is to update the `@slack/client` dependency in your app to `v5.0.0`. This version just imports the
`@slack/web-api`, `@slack/rtm-api`, and `@slack/webhook` packages, and re-exports the same classes as the `v4.x`
versions. The breaking changes below would still need to be addressed, but this sames you the time of adjusting all your
`require()` statements. If you were already avoiding deprecated features, your app will likely just run at
that point! Once you've adjusted for any breaking changes, we still recommend that you follow up by migrating to the
individual packages, as they are lighter and will save you time and disk space when you install your dependencies the
next time.

## `WebClient`

### Callbacks to Promises

The `WebClient` no longer supports callback functions to receive results and errors of API method calls. We recommend
that you migrate to using `Promise`s and `async` functions instead. Using `Promise`s can simplify your code by reducing
nesting, generally referred to as "the pyramid of doom".

Before:

```javascript
// Making a Web API call with a callback
web.chat.postMessage({ text: 'Hello', channel: 'C123456' }, (error, result) => {
  // Error handling
  if (error) {
    console.log(error);
    return;
  }

  // Using the result
  console.log(result);

  // Making another Web API call
  web.users.list({}, (error, result) => {
    // More error handling
    if (error) {
      console.log(error);
      return;
    }

    // Using the second result
    console.log(result);
  });
});
```

After:

```javascript
// Wrap in an async function
(async () => {
  try {
    // First API call
    const result = await web.chat.postMessage({ text: 'Hello', channel: 'C123456' });

    // Use first result
    console.log(result);

    // Second API call
    const result2 = await web.users.list();

    // Use second result
    console.log(result2);
  } catch (error) {
    // Only handle errors once
  }
})();
```

If you prefer to still use callbacks, Node ships with a
[`util.callbackify()`](https://nodejs.org/api/util.html#util_util_callbackify_original), which can be used to wrap
method calls so that there's no need to deal with `Promise`s.

After:

```javascript
const { callbackify } = require('util');

// Wrap Promise returning function to make a callback accepting function
const chatPostMessage = callbackify(web.chat.postMessage);

chatPostMessage({ text: 'Hello', channel: 'C123456' }, (error, result) => {
  // Normal callback with error-first
});
```

### Response metadata

If your app read the `scopes`, `acceptedScopes`, or `retryAfter` values from the result of an API call, those values
have been moved, just slightly, to properties of the `response_metadata`.

Before:

```javascript
(async () => {
  const result = await web.chat.postMessage({ text: 'Hello', channel: 'C123456' });

  // These values were properties of the result
  console.log(result.scopes);
  console.log(result.acceptedScopes);
  console.log(result.retryAfter);
})();
```

After:

```javascript
(async () => {
  const result = await web.chat.postMessage({ text: 'Hello', channel: 'C123456' });

  // Now they are properties of `response_metadata`
  console.log(result.response_metadata.scopes);
  console.log(result.response_metadata.acceptedScopes);
  console.log(result.response_metadata.retryAfter);
})();
```

### Simplified agent option

If your app is using the `agent` option and its working, its most likely going to continue to work.

Only if your app set the `agent` option to an object with an `http` or an `https` property, you should consolidate the
value by only using the value of the `https` property. This is a simplified design, because only the `https` value would
have been used when both were defined anyway.

Before:

```javascript
const web = new WebClient(token, {
  // An agent with both the `http` and `https` property defined
  agent: {
    http: proxyAgent,
    https: proxyAgent,
  },
});
```

After:

```javascript
const web = new WebClient(token, {
  // Consolidated into one value
  agent: proxyAgent,
});
```

### Removed methods

The `files.comments.add` and `files.comments.edit` named methods were removed. If you still need to use them, you can
use the `.apiCall(methodName, options)` method instead, but we recommend that you instead use [threaded
messages](https://api.slack.com/changelog/2018-05-file-threads-soon-tread) instead of file comments.

All named methods in the `apps.*` family of methods were removed. Again, you can use the the `.apiCall(methodName,
options)` method instead, but [we recommend migrating your
app](https://medium.com/slack-developer-blog/an-update-on-workspace-apps-aabc9e42a98b) to using bot tokens instead of
building workspace apps.

### Token rotation

Workspace apps allowed for short-lived tokens that the `WebClient` could automatically refresh. This required
initializing the `WebClient` with a `clientId`, `clientSecret`, and `refreshToken`. Since workspace apps are no longer
supported, this functionality has been removed. We recommend [migrating your
app](https://medium.com/slack-developer-blog/an-update-on-workspace-apps-aabc9e42a98b) to using bot tokens instead of
building workspace apps.

### Error code changes

The string values of error codes in `ErrorCode` export have changed. If your app compares the `error.code` with a string
literal, you need to update that code. Instead, compare with a property of the export such as `ErrorCode.RequestError`.

If your app used the `ErrorCode.WebAPICallReadError` export to compare with `error.code`, you can remove this
comparison. The `WebAPICallReadError` was never used by the `WebClient`.

### Logger objects

If your app set the `logger` option to a function, you need to update the code to instead use an object with methods
for each log level. See details in [the logging documentation](https://slack.dev/node-slack-sdk/web-api#logging).

### New retry policies

If your app used the `retryPolicies` export from `@slack/client`, you need to adjust your code. The values have [been
renamed](https://github.com/slackapi/node-slack-sdk/issues/734).

## `RTMClient`

### Callbacks to Promises

The `RTMClient` no longer supports callback functions to receive results and errors of `.sendMessage()`. We recommend
that you migrate to using `Promise`s and `async` functions instead. Using `Promise`s can simplify your code by reducing
nesting, generally referred to as "the pyramid of doom".

Before:

```javascript
// Sending a message using a callback
rtm.sendMessage('Hello', 'C123456', (error, reply) => {
  // Handle error
  if (error) {
    console.log(error)
    return;
  }

  // Use result
  console.log(reply);
});
```

After:

```javascript
(async () => {
  try {
    const reply = await rtm.sendMessage('Hello', 'C123456');

    // Use result
    console.log(reply);
  } catch (error) {
    // Handle error
    console.log(error);
  }
})();
```

### Raw messages

If your app was listening for the `raw_message` event, you should update the code to instead use the `slack_event`
event. The `raw_message` event emitted a string, which was encoded in JSON, so you typically needed to parse it. The
`slack_event` event emits an object, which is already parsed, so you can skip calling `JSON.parse(event)`.

### Simplified agent option

If your app is using the `agent` option and its working, its most likely going to continue to work.

Only if your app set the `agent` option to an object with an `http` or an `https` property, you should consolidate the
value by only using the value of the `https` property. This is a simplified design, because only the `https` value would
have been used when both were defined anyway.

Before:

```javascript
const rtm = new RTMClient(token, {
  // An agent with both the `http` and `https` property defined
  agent: {
    http: proxyAgent,
    https: proxyAgent,
  },
});
```

After:

```javascript
const rtm = new RTMClient(token, {
  // Consolidated into one value
  agent: proxyAgent,
});
```

### Error code changes

The `RTM` prefix from the property names of `ErrorCode` have been removed. For example, `ErrorCode.RTMWebsocketError` is
now `ErrorCode.WebsocketError`.

The string values of error codes in `ErrorCode` export have changed. If your app compares the `error.code` with a string
literal, you need to update that code. Instead, compare with a property of the export such as `ErrorCode.WebsocketError`.

### Logger objects

If your app set the `logger` option to a function, you need to update the code to instead use an object with methods
for each log level. See details in [the logging documentation](https://slack.dev/node-slack-sdk/rtm-api#logging).

## IncomingWebhook

### Callbacks to Promises

The `IncomingWebhook` no longer supports callback functions to receive results and errors of `.send()`. We recommend
that you migrate to using `Promise`s and `async` functions instead. Using `Promise`s can simplify your code by reducing
nesting, generally referred to as "the pyramid of doom".

Before:

```javascript
// Sending a message using a callback
webhook.send('Hello', (error, reply) => {
  // Handle error
  if (error) {
    console.log(error)
    return;
  }

  // Use result
  console.log(reply);
});
```

After:

```javascript
(async () => {
  try {
    const reply = await webhook.send('Hello');

    // Use result
    console.log(reply);
  } catch (error) {
    // Handle error
    console.log(error);
  }
})();
```

### Simplified agent option

If your app is using the `agent` option and its working, its most likely going to continue to work.

Only if your app set the `agent` option to an object with an `http` or an `https` property, you should consolidate the
value by only using the value of the `https` property. This is a simplified design, because only the `https` value would
have been used when both were defined anyway.

Before:

```javascript
const webhook = new IncomingWebhook(token, {
  // An agent with both the `http` and `https` property defined
  agent: {
    http: proxyAgent,
    https: proxyAgent,
  },
});
```

After:

```javascript
const webhook = new IncomingWebhook(token, {
  // Consolidated into one value
  agent: proxyAgent,
});
```

### Error code changes

The `IncomingWebhook` prefix from the property names of `ErrorCode` have been removed. For example,
`ErrorCode.IncomingWebhookRequestError` is now `ErrorCode.RequestError`.

The string values of error codes in `ErrorCode` export have changed. If your app compares the `error.code` with a string
literal, you need to update that code. Instead, compare with a property of the export such as `ErrorCode.RequestError`.
